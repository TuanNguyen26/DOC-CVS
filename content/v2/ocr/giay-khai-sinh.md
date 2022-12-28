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
| `img`         | `https://example.com/blx.png` | Url ảnh giấy khai sinh cần trích xuất thông tin             |
| `format_type` | `url`                         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | Trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

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
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

**Body**:

| Key   | Type   | Value         | Mô tả                                            |
| ----- | ------ | ------------- | ------------------------------------------------ |
| `img` | `file` | `example.jpg` | File ảnh giấy khai sinh cần trích xuất thông tin |

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
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy khai sinh đã được cắt và căn chỉnh          |

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

Trong đó trường data là một list, mỗi phần tử trong list tương ứng với một báo giá (một báo giá có thể là một hoặc nhiều trang). Mỗi phần tử này là một json định dạng như sau:

```json
{
“type": “price_quotation" - Thể hiện loại giấy tờ ở đây là giấy khai sinh
“info": [xxxx]
}
```

Giấy khai sinh - `birth_certificate`

- `dob` : Ngày sinh.
- `dob_confidence` : Độ tin cậy của thông tin trích xuất ngày sinh.
- `father_dob` : Ngày sinh cha.
- `father_dob_confidence` : Độ tin cậy của thông tin trích xuất ngày sinh cha.
- `father_name` : Họ tên cha.
- `father_name_confidence` : Độ tin cậy của thông tin trích xuất họ tên cha.
- `gender` : Giới tính.
- `gender_confidence` : Độ tin cậy của thông tin trích xuất giới tính.
- `mother_dob` : Ngày sinh mẹ.
- `mother_dob_confidence` : Độ tin cậy của thông tin trích xuất ngày sinh mẹ.
- `mother_name` : Họ tên mẹ.
- `mother_name_confidence` : Độ tin cậy của thông tin trích xuất họ tên mẹ.
- `name` : Họ tên.
- `name_confidence` : Độ tin cậy của thông tin trích xuất họ tên.
- `number` : số giấy khai sinh.
- `number_confidence` : Độ tin cậy của thông tin trích xuất quyển số giấy khai sinh.
- `number_book` : Quyển số giấy khai sinh.
- `number_book_confidence` : Độ tin cậy của thông tin trích xuất quyển số giấy khai sinh.
- `regis_date` : Ngày đăng ký.
- `regis_date_confidence` : Độ tin cậy của thông tin trích xuất ngày đăng ký.
- `id` : Số định danh.
- `id_confidence` : Độ tin cậy của thông tin trích xuất số định danh.
- `regis_place` : Nơi đăng ký.
- `regis_place_confidence` : Độ tin cậy của thông tin trích xuất nơi đăng ký.
- `regis_place_district` : Quận/huyện trong nơi đăng ký.
- `regis_place_district_code` : Mã quận/huyện trong nơi đăng ký.
- `regis_place_town` : Tỉnh/thành phố trong nơi đăng ký.
- `regis_place_town_code` : Mã tỉnh/thành phố trong nơi đăng ký.
- `regis_place_ward` : Phường/xã trong nơi đăng ký.
- `regis_place_ward_code` : Phường/xã trong nơi đăng ký.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy khai sinh.
