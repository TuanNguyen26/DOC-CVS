---
title: 'Báo giá xe'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
id: 17
metaDescription: 'This is the api v2 for this page'
---

#### 1. Trích xuất thông tin Báo giá xe với đầu vào url ảnh

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/price_quotation` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh                                                 |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Báo giá xe đã được căn chỉnh                 |

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
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo giá xe đã được căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                                            |
| ----- | ---- | ------------- | ------------------------------------------------ |
| `img` | file | `example.jpg` | file ảnh của Báo giá xe cần trích xuất thông tin |

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
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Báo giá xe đã được xoay và căn chỉnh         |

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

Chú ý: Trường hợp trích xuất thông tin từ file PDF, nhiều loại giấy tờ trong một ảnh, bằng lái xe, đăng ký xe, đăng kiểm xe, báo giá xe, giấy khai sinh không có trường valid và trường invalidMessage.

Trong trường hợp trích xuất thông tin từ file PDF hoặc nhiều loại giấy tờ trong một ảnh, trường data sẽ là 1 list các phần tử có các trường ở trên.

Trong trường hợp trích xuất thông tin từ văn bản scan, trường data sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của 1 trang trong file pdf hoặc của 1 ảnh. Mỗi phần tử trong list này được biểu thị như sau:

```javascript
[
  // list các block trong cùng một trang
  [
    // list các line trong cùng một block
    [
      // list các text trong cùng một line (*)
    ],
  ],
];
```

Mỗi phần tử text (\*) bao gồm các trường sau:

```javascript
{
  "text": string, // nội dung của text
  "confidence": float, // độ tin cậy của text
  "box": {
    "left": int, // tọa độ bên trái của text
    "right": int, // tọa độ bên phải của text
    "top": int, // tọa độ bên trên của text
    "bottom": int // tọa độ bên dưới của text
  }
}
```

Trong trường hợp trích xuất thông tin dạng bảng, trường data sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của một bảng. Mỗi phần tử gồm các trường:

- image: ảnh bảng đã được cắt và căn chỉnh
- info: thông tin bảng, trường này là một list, mỗi phần tử trong list tương ứng thông tin của một hàng

Ví dụ:

```javascript
{
  "data": [
    {
      "info": [
        ["3", "Liti", "Li"],
        ["4", "Beri", "Be"],
        ["5", "Bo", "B"]
      ],
      "image": "<base64_img1>"
    },
    {
      "info": [
        ["Column1", "column2"],
        ["1", "2"],
        ["1", "1"]
      ],
      "image": "<base64_img2>"
    }
  ]
}
```

Báo giá xe:

- name_of_garage: Cơ sở sửa chữa.
- name_of_garage_box: tọa độ Cơ sở sửa chữa là danh sách gồm [left, top, right, bottom].
- name_of_garage_confidence: độ tin cậy của Cơ sở sửa chữa.
- quotation_date: Ngày báo giá.
- quotation_date_box: tọa độ Ngày báo giá là danh sách gồm [left, top, right, bottom].
- quotation_date_confidence: độ tin cậy của Ngày báo giá.
- estimated_delivery_date: Ngày dự kiến giao xe.
- estimated_delivery_date_box: tọa độ Ngày dự kiến giao xe là danh sách gồm [left, top, right, bottom].
- estimated_delivery_date_confidence: độ tin cậy của Ngày dự kiến giao xe.
- total_amount: Tổng tiền sửa chữa sau thuế.
- total_amount_box: tọa độ Tổng tiền sửa chữa sau thuế là danh sách gồm [left, top, right, bottom].
- total_amount_confidence: độ tin cậy của Tổng tiền sửa chữa sau thuế.
- sub_total: Tổng tiền sửa chữa trước thuế.
- sub_total_box: tọa độ Tổng tiền sửa chữa trước thuế là danh sách gồm [left, top, right, bottom].
- sub_total_confidence: độ tin cậy của Tổng tiền sửa chữa trước thuế.
- vat_amount: Tiền thuế.
- vat_amount_box: tọa độ Tiền thuế là danh sách gồm [left, top, right, bottom].
- vat_amount_confidence: độ tin cậy của Tiền thuế.
- table: thông tin bảng, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
  - description: Tên phụ tùng, dịch vụ sửa chữa.
  - description_box: tọa độ Tên phụ tùng, dịch vụ sửa chữa là danh sách gồm [left, top, right, bottom].
  - description_confidence: độ tin cậy của Tên phụ tùng, dịch vụ sửa chữa.
  - quantity: Số lượng.
  - quantity_box: tọa độ Số lượng là danh sách gồm [left, top, right, bottom].
  - quantity_confidence: độ tin cậy của Số lượng.
  - unit_price: Đơn giá.
  - unit_price_box: tọa độ Đơn giá là danh sách gồm [left, top, right, bottom].
  - unit_price_confidence: độ tin cậy của Đơn giá.
  - percent_discount: Phần trăm giảm giá.
  - percent_discount_box: tọa độ Phần trăm giảm giá là danh sách gồm [left, top, right, bottom].
  - percent_discount_confidence: độ tin cậy của Phần trăm giảm giá.
  - discount: Số tiền giảm giá.
  - discount_box: tọa độ Số tiền giảm giá là danh sách gồm [left, top, right, bottom].
  - discount_confidence: độ tin cậy của Số tiền giảm giá.
- image: Ảnh của báo giá đã được căn chỉnh.
- image_table: Ảnh của bảng trong báo giá đã được căn chỉnh.
