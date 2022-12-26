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

Trường hợp trích xuất thông tin từ báo giá xe không có trường valid và trường invalidMessage.

Báo giá xe: Trả về một danh sách gồm

- `name_of_garage` : Cơ sở sửa chữa.
- `name_of_garage_box` : Tọa độ Cơ sở sửa chữa là danh sách gồm [left, top, right, bottom].
- `name_of_garage_confidence` : Độ tin cậy của Cơ sở sửa chữa.
- `quotation_date` : Ngày báo giá.
- `quotation_date_box` : Tọa độ Ngày báo giá là danh sách gồm [left, top, right, bottom].
- `quotation_date_confidence` : Độ tin cậy của Ngày báo giá.
- `estimated_delivery_date` : Ngày dự kiến giao xe.
- `estimated_delivery_date_box` : Tọa độ Ngày dự kiến giao xe là danh sách gồm [left, top, right, bottom].
- `estimated_delivery_date_confidence` : Độ tin cậy của Ngày dự kiến giao xe.
- `total_amount` : Tổng tiền sửa chữa sau thuế.
- `total_amount_box` : Tọa độ Tổng tiền sửa chữa sau thuế là danh sách gồm [left, top, right, bottom].
- `total_amount_confidence` : Độ tin cậy của Tổng tiền sửa chữa sau thuế.
- `sub_total` : Tổng tiền sửa chữa trước thuế.
- `sub_total_box` : Tọa độ Tổng tiền sửa chữa trước thuế là danh sách gồm [left, top, right, bottom].
- `sub_total_confidence` : Độ tin cậy của Tổng tiền sửa chữa trước thuế.
- `vat_amount` : Tiền thuế.
- `vat_amount_box` : Tọa độ Tiền thuế là danh sách gồm [left, top, right, bottom].
- `vat_amount_confidence` : Độ tin cậy của Tiền thuế.
- `table` : Thông tin bảng, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
  - `description` : Tên phụ tùng, dịch vụ sửa chữa.
  - `description_box` : Tọa độ Tên phụ tùng, dịch vụ sửa chữa là danh sách gồm [left, top, right, bottom].
  - `description_confidence` : Độ tin cậy của Tên phụ tùng, dịch vụ sửa chữa.
  - `quantity` : Số lượng.
  - `quantity_box` : Tọa độ Số lượng là danh sách gồm [left, top, right, bottom].
  - `quantity_confidence` : Độ tin cậy của Số lượng.
  - `unit_price` : Đơn giá.
  - `unit_price_box` : Tọa độ Đơn giá là danh sách gồm [left, top, right, bottom].
  - `unit_price_confidence` : Độ tin cậy của Đơn giá.
  - `percent_discount` : Phần trăm giảm giá.
  - `percent_discount_box` : Tọa độ Phần trăm giảm giá là danh sách gồm [left, top, right, bottom].
  - `percent_discount_confidence` : Độ tin cậy của Phần trăm giảm giá.
  - `discount`: Số tiền giảm giá.
  - `discount_box` : Tọa độ Số tiền giảm giá là danh sách gồm [left, top, right, bottom].
  - `discount_confidence` : Độ tin cậy của Số tiền giảm giá.
- `image` : Ảnh của báo giá đã được căn chỉnh.
- `image_table` : Ảnh của bảng trong báo giá đã được căn chỉnh.
