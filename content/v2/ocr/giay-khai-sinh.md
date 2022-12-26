---
title: 'Giấy khai sinh'
metaTitle: 'Giấy khai sinh'
stt: 10
---

#### 1. Trích xuất thông tin giấy khai sinh với đầu vào url ảnh

**API**:

| Method | URL                                                                |
| ------ | ------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` |

**Params**:

| Key           | Value                         | Mô tả                                                       |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/blx.png` | url ảnh giấy khai sinh cần trích xuất thông tin             |
| `format_type` | `url`                         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin giấy khai sinh với đầu vào file ảnh

**API**:

| Method | URL                                                                | content-type          |
| ------ | ------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Body**:

| Key   | Type   | Value         | Mô tả                                            |
| ----- | ------ | ------------- | ------------------------------------------------ |
| `img` | `file` | `example.jpg` | file ảnh giấy khai sinh cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin giấy khai sinh với đầu vào json

**API**:

| Method | URL                                                                | content-type       |
| ------ | ------------------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Body**:

```json
{
  "img": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
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
    "https://cloud.computervision.com.vn/api/v2/ocr/birth_certificate?format_type=base64&get_thumb=false",
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

Trường hợp trích xuất thông tin từ giấy khai sinh không có trường valid và trường invalidMessage.

Giấy khai sinh:

- `dob` : ngày sinh.
- `dob_confidence` : độ tin cậy của thông tin trích xuất ngày sinh.
- `father_dob` : ngày sinh cha.
- `father_dob_confidence` : độ tin cậy của thông tin trích xuất ngày sinh cha.
- `father_name` : họ tên cha.
- `father_name_confidence` : độ tin cậy của thông tin trích xuất họ tên cha.
- `gender` : giới tính.
- `gender_confidence` : độ tin cậy của thông tin trích xuất giới tính.
- `mother_dob` : ngày sinh mẹ.
- `mother_dob_confidence` : độ tin cậy của thông tin trích xuất ngày sinh mẹ.
- `mother_name` : họ tên mẹ.
- `mother_name_confidence` : độ tin cậy của thông tin trích xuất họ tên mẹ.
- `name` : họ tên.
- `name_confidence` : độ tin cậy của thông tin trích xuất họ tên.
- `number` : số giấy khai sinh.
- `number_confidence` : độ tin cậy của thông tin trích xuất số giấy khai sinh.
- `number_book` : quyển số giấy khai sinh.
- `number_book_confidence` : độ tin cậy của thông tin trích xuất quyển số giấy khai sinh.
- `regis_date` : ngày đăng ký.
- `regis_date_confidence` : độ tin cậy của thông tin trích xuất ngày đăng ký.
- `image` : ảnh đã cắt ra và căn chỉnh của giấy khai sinh.
