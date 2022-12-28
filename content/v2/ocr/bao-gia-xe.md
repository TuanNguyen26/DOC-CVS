---
title: 'Báo giá xe'
metaTitle: 'Báo giá xe'
stt: 4
---

#### 1. Trích xuất thông tin Báo giá xe với đầu vào url ảnh

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh                                                 |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Báo giá xe đã được căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Báo giá xe với đầu vào file ảnh

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Báo giá xe đã được căn chỉnh                 |

**Body**:

| Key   | Type   | Value         | Mô tả                                            |
| ----- | ------ | ------------- | ------------------------------------------------ |
| `img` | `file` | `example.jpg` | File ảnh của Báo giá xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Báo giá xe với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Báo giá xe đã được xoay và căn chỉnh         |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation?format_type=base64&get_thumb=false",
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

Trong đó trường data là một list, mỗi phần tử trong list tương ứng với một báo giá (một báo giá có thể là một hoặc nhiều trang). Mỗi phần tử này là một json định dạng như sau:

```json
{
“type": “price_quotation" - Thể hiện loại giấy tờ ở đây là báo giá
“info": [xxxx]
}
```

Trong đó trường info thể hiện thông tin trích xuất được từ báo giá. Trường info là một json có các trường như sau:

- `estimated_delivery_date` : Ngày dự kiến giao xe
- `estimated_delivery_date_box` : Tọa độ ngày dự kiến giao xe là một list gồm [left, top, right, bottom]
- `estimated_delivery_date_confidence` : Độ tin cậy của ngày dự kiến giao xe
- `image` : Ảnh của báo giá đã được căn chỉnh, định dạng base64
- `image_table` : Ảnh của bảng trong báo giá đã được căn chỉnh, định dạng base64
- `make_model` : Loại xe
- `make_model_box` : Tọa độ loại xe là một list gồm [left, top, right, bottom]
- `make_model_confidence` : Độ tin cậy của loại xe
- `name_of_garage` : Cơ sở sửa chữa
- `name_of_garage_box` : Tọa độ cơ sở sửa chữa là một list gồm [left, top, right, bottom]
- `name_of_garage_confidence` : Độ tin cậy của cơ sở sửa chữa
- `number_plate` : Biển số xe
- `number_plate_box` : Tọa độ biển số xe là một list gồm [left, top, right, bottom]
- `number_plate_confidence` : Độ tin cậy của biển số xe
- `quotation_date` : Ngày báo giá
- `quotation_date_box` : Tọa độ ngày báo giá là một list gồm [left, top, right, bottom]
- `quotation_date_confidence` : Độ tin cậy của ngày báo giá
- `sub_total` : Tổng tiền sửa chữa trước thuế
- `sub_total_box` : Tọa độ tổng tiền sửa chữa trước thuế là một list gồm [left, top, right, bottom]
- `sub_total_confidence` : Độ tin cậy của tổng tiền sửa chữa trước thuế
- `table` : Chứa thông tin trích xuất từ bảng. Là một list, mỗi phần tử trong list chứa thông tin của một hàng. Mỗi phần tử này là một json chứa các thông tin sau:
  - `amount_total` : Thành tiền
  - `amount_total_box` : Tọa độ phần thành tiền là một list gồm [left, top, right, bottom]
  - `amount_total_confidence` : Độ tin cậy của thành tiền
  - `description` : Tên phụ tùng, dịch vụ sửa chữa
  - `description_box` : Tọa độ tên phụ tùng, dịch vụ sửa chữa là một list gồm [left, top, right, bottom]
  - `description_confidence` : Độ tin cậy của tên phụ tùng, dịch vụ sửa chữa
  - `discount` : Số tiền giảm giá
  - `discount_box` : Tọa độ số tiền giảm giá là một list gồm [left, top, right, bottom]
  - `discount_confidence` : Độ tin cậy của số tiền giảm giá
  - `percent_discount` : Phần trăm giảm giá
  - `percent_discount_box` : Tọa độ phần trăm giảm giá là một list gồm [left, top, right, bottom]
  - `percent_discount_confidence` : Độ tin cậy của phần trăm giảm giá
  - `quantity` : Số lượng
  - `quantity_box` : Tọa độ số lượng là một list gồm [left, top, right, bottom]
  - `quantity_confidence` : Độ tin cậy của số lượng
  - `tax` : Phần trăm thuế
  - `tax_box` : Tọa độ phần trăm thuế là một list gồm [left, top, right, bottom]
  - `tax_confidence` : Độ tin cậy của phần trăm thuế
  - `unit_price` : Đơn giá
  - `unit_price_box` : Tọa độ đơn giá là một list gồm [left, top, right, bottom]
  - `unit_price_confidence` : Độ tin cậy của đơn giá
- `total_amount` : Tổng tiền sửa chữa sau thuế
- `total_amount_box` : Tọa độ tổng tiền sửa chữa sau thuế là một list gồm [left, top, right, bottom]
- `total_amount_confidence` : Độ tin cậy của tổng tiền sửa chữa sau thuế
- `vat_amount` : Tiền thuế
- `vat_amount_box` : Tọa độ tiền thuế là một list gồm [left, top, right, bottom]
- `vat_amount_confidence` : Độ tin cậy của tiền thuế

Bảng mã lỗi:

| errorCode | errorMessage                       | Mô tả                          |
| --------- | ---------------------------------- | ------------------------------ |
| 0         | Success                            | Thành công                     |
| 1         | Incorrect image format             | Ảnh bị lỗi                     |
| 2         | Url is unavailable                 | Link ảnh bị lỗi                |
| 3         | The photo does not contain content | Ảnh không chứa nội dung        |
| 4         | Incorrect Api_key or api_secret    | api_key hoặc api_secret sai    |
| 5         | Out of requests                    | Hết số lượng requests hữu dụng |
| 6         | Error when processing the request  | Lỗi khi xử lý request          |
