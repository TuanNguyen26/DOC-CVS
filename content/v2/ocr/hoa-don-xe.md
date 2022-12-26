---
title: 'Hóa đơn xe'
metaTitle: 'Hóa đơn xe'
stt: 11
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

```javascript
{
  "data": [xxxx],
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Trong trường hợp nhận dạng 1 giấy tờ tùy thân bất kì, trường data sẽ có gồm các thông tin sau:

```javascript
{
  "info": [xxxx],
  "valid": [xxxx],
  "invalidMessage": [xxxx],
  "type": [xxxx]
}
```

Hóa đơn xe: Trả về một danh sách, mỗi phần từ trong danh sách gồm

- `date` : Ngày lập hóa đơn.
- `date_box` : Tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- `date_confidence` : Độ tin cậy của ngày lập hóa đơn.
- `form` : Mẫu số.
- `form_box` : Tọa độ mẫu số hóa đơn là danh sách gồm [left, top, right, bottom].
- `form_confidence` : Độ tin cậy của mẫu số.
- `invoice_no` : Số hóa đơn.
- `invoice_no_box` : Tọa độ số hóa đơn là danh sách gồm [left, top, right, bottom].
- `invoice_no_confidence` : Độ tin cậy của số hóa đơn.
- `serial_no` : Số ký hiệu hóa đơn.
- `serial_no_box` : Tọa độ số ký hiệu hóa đơn là danh sách gồm [left, top, right, bottom].
- `serial_no_confidence` : Độ tin cậy của số ký hiệu hóa đơn.
- `supplier` : Nhà cung cấp.
- `supplier_box` : Tọa độ nhà cung cấp là danh sách gồm [left, top, right, bottom].
- `supplier_confidence` : Độ tin cậy của nhà cung cấp.
- `tax_code` : Mã số thuế nhà cung cấp.
- `tax_code_box` : Tọa độ mã số thuế nhà cung cấp là danh sách gồm [left, top, right, bottom].
- `tax_code_confidence` : Độ tin cậy của mã số thuế nhà cung cấp.
- `total_amount` : Tổng tiền.
- `total_amount_box` : Tọa độ tổng tiền là danh sách gồm [left, top, right, bottom].
- `total_amount_confidence` : Độ tin cậy của tổng tiền.
- `date` : Ngày lập hóa đơn.
- `date_box` : Tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- `date_confidence` : Độ tin cậy của ngày lập hóa đơn.
- `info_goods` : Thông tin hàng hóa, dịch vụ, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
- `name` : Tên hàng hóa, dịch vụ
- `coin` : Giá của hàng hóa, dịch vụ
- `image` : Ảnh hóa đơn đã được xoay và căn chỉnh.
