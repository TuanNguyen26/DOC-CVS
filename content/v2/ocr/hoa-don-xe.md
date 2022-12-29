---
title: 'Hóa đơn xe'
metaTitle: 'Hóa đơn xe'
stt: 10
---

#### 1. Trích xuất thông tin hóa đơn xe với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin hóa đơn xe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type   | Value         | Mô tả                                                      |
| ----- | ------ | ------------- | ---------------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc file pdf hóa đơn xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin hóa đơn xe với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh hóa đơn xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh hoặc pdf cần trích xuất
}
```

**Demo Python**:

```python
import base64
import io
import requests
from PIL import Image
def get_byte_img(img):
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return encoded_img
api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_name = "path_img"
encode_cmt = get_byte_img(Image.open(img_name))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice_vehicle?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": [xxxx],
  "errorCode": string, // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

Trong đó trường `data` là một list, mỗi phần tử trong list tương ứng với một trang hóa đơn. Mỗi phần tử này là một json định dạng như sau:

```json
{
"type": "invoice" // Thể hiện loại giấy tờ ở đây là hóa đơn
"info": [xxxx]
}
```

Hóa đơn xe - `invoice_vehicle`

- `account_bank`: Số tài khoản và ngân hàng đi kèm của nhà cung cấp. Trường này là một list. Mỗi phần tử trong list là một JSON biểu thị một số tài khoản và ngân hàng đi kèm. Phần tử này gồm các trường sau đây:
  - `account_no`: Số tài khoản
  - `account_no_box`: Tọa độ số tài khoản là một list gồm [left, top, right, bottom]
  - `account_no_confidence`: Độ tin cậy số tài khoản
  - `bank`: Tên ngân hàng
  - `bank_box`: Tọa độ tên ngân hàng là một list gồm [left, top, right, bottom]
  - `bank_confidence`: Độ tin cậy tên ngân hàng
- `buyer_name`: Họ tên người mua hàng
- `buyer_name_box`: Tọa độ họ tên người mua hàng là một list gồm [left, top, right, bottom]
- `buyer_name_confidence`: Độ tin cậy của họ tên người mua hàng
- `date`: Ngày lập hóa đơn
- `date_box`: Tọa độ ngày lập hóa đơn là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy của ngày lập hóa đơn
- `form`: Mẫu số
- `form_box`: Tọa độ mẫu số hóa đơn là một list gồm [left, top, right, bottom]
- `form_confidence`: Độ tin cậy của mẫu số
- `image`: Ảnh hóa đơn đã được cắt và căn chỉnh, định dạng base64
- `image_table`: Ảnh phần bảng trên hóa đơn
- `invoice_no`: Số hóa đơn
- `invoice_no_box`: Tọa độ số hóa đơn là một list gồm [left, top, right, bottom]
- `invoice_no_confidence`: Độ tin cậy của số hóa đơn
- `lookup_code`: Mã tra cứu hóa đơn
- `lookup_code_box`: Tọa độ mã tra cứu hóa đơn là một list gồm [left, top, right, bottom]
- `lookup_code_confidence`: Độ tin cậy mã tra cứu hóa đơn
- `lookup_website`: Đường dẫn trang web để tra cứu hóa đơn
- `lookup_website_box`: Tọa độ đường dẫn trang web là một list gồm [left, top, right, bottom]
- `lookup_website_confidence`: Độ tin cậy đường dẫn trang web
- `payment_method`: Hình thức thanh toán
- `payment_method_box`: Tọa độ hình thức thanh toán là một list gồm [left, top, right, bottom]
- `payment_method_confidence`: Độ tin cậy của hình thức thanh toán
- `purchaser_name`: Tên đơn vị mua hàng
- `purchaser_name_box`: Tọa độ tên đơn vị mua hàng là một list gồm [left, top, right, bottom]
- `purchaser_name_confidence`: Độ tin cậy tên đơn vị mua hàng
- `serial_no`: Số ký hiệu hóa đơn
- `serial_no_box`: Tọa độ số ký hiệu hóa đơn là một list gồm [left, top, right, bottom]
- `serial_no_confidence`: Độ tin cậy của số ký hiệu hóa đơn
- `sub_total`: Tiền trước thuế
- `sub_total_box`: Tọa độ tiền trước thuế là một list gồm [left, top, right, bottom]
- `sub_total_confidence`: Độ tin cậy của tiền trước thuế
- `supplier`: Nhà cung cấp
- `supplier_box`: Tọa độ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_confidence`: Độ tin cậy của nhà cung cấp
- `supplier_address`: Địa chỉ nhà cung cấp
- `supplier_address_box`: Tọa độ địa chỉ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_address_confidence`: Độ tin cậy của địa chỉ nhà cung cấp
- `table`: Chứa thông tin trích xuất từ bảng. Là một list chứa thông tin của các hàng. Mỗi phần tử trong list này là một list chứa thông tin của một hàng. Mỗi phần tử trong hàng là một dictionary chứa các thông tin sau:
  - `value`: Giá trị
  - `box`: Tọa độ là một list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy
  - `label`: Nhãn của cột tương ứng.Lưu ý: Phần label có thể là:
    - `number`: Số thứ tự
    - `description`: Tên hàng hóa dịch vụ
    - `unit`: Đơn vị tính
    - `quantity`: Số lượng
    - `unit_price`: Đơn giá
    - `amount_before_tax`: Tổng tiền trước thuế
    - `tax`: Thuế suất
    - `tax_amount`: Tiền thuế
    - `amount_total`: Tổng tiền sau thuế
- `tax_code`: Mã số thuế nhà cung cấp
- `tax_code_box`: Tọa độ mã số thuế nhà cung cấp là một list gồm [left, top, right, bottom]
- `tax_code_confidence`: Độ tin cậy của mã số thuế nhà cung cấp
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy của tổng tiền
- `valid_seals`: Hóa đơn có dấu mộc đỏ hay không? Trả về True hoặc False
- `vat_amount`: Tiền thuế
- `vat_amount_box`: Tọa độ tiền thuế là một list gồm [left, top, right, bottom]
- `vat_amount_confidence`: Độ tin cậy của tiền thuế
- `vat_rate`: Thuế suất giá trị gia tăng
- `vat_rate_box`: Tọa độ thuế suất giá trị gia tăng là một list gồm [left, top, right, bottom]
- `vat_rate_confidence`: Độ tin cậy của thuế giá trị gia tăng

| errorCode | errorMessage                       | Mô tả                          |
| --------- | ---------------------------------- | ------------------------------ |
| 0         | Success                            | Thành công                     |
| 1         | Incorrect image format             | Ảnh bị lỗi                     |
| 2         | Url is unavailabl                  | Link ảnh bị lỗi                |
| 3         | The photo does not contain content | Ảnh không chứa nội dung        |
| 4         | Incorrect Api_key or api_secret    | api_key hoặc api_secret sai    |
| 5         | Out of requests                    | Hết số lượng requests hữu dụng |
| 6         | Error when processing the request  | Lỗi khi xử lý request          |
