---
title: 'Face Matching'
metaTitle: ' Face Matching'
metaDescription: 'This is the api v1 for this page'
id: 2
---

Matching service là hệ thống AI cho phép so sánh độ tương đồng giữa khuôn mặt có trong chứng minh nhân dân, thẻ căn cước của người chủ sở hữu với khuôn mặt được chụp trực tiếp của cùng một người đó.

#### 1. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào url ảnh

**API**:

| Method | URL                                                                                 |
| ------ | ----------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matching` |

**Params**:

| Key          | Value                            | Mô tả                                    |
| ------------ | -------------------------------- | ---------------------------------------- |
| `img_cmt`    | `https://example.com/cmt.png`    | url ảnh chứng minh thư hoặc thẻ căn cước |
| `img_person` | `https://example.com/person.png` | url ảnh khuôn mặt cần so khớp            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_cmt = 'link_url_img_cmt'
img_person = 'link_url_person'

response = requests.get("https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matching?img_cmt=%s&img_person=%s"
  % (img_cmt, img_person),
  auth=(api_key, api_secret))

print(response.json())
```

#### 2. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào file ảnh

**API**:

| Method | URL                                                                                 | content-type          |
| ------ | ----------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matching` | `multipart/form-data` |

**Body**:

| Key          | Type | Value                | Mô tả                                     |
| ------------ | ---- | -------------------- | ----------------------------------------- |
| `img_cmt`    | file | `example_cmt.jpg`    | file ảnh chứng minh thư hoặc thẻ căn cước |
| `img_person` | file | `example_person.jpg` | file ảnh khuôn mặt cần so khớp            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_cmt_path = '/path/to/your/img_cmt.jpg'
img_person_path = '/path/to/your/img_person.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matching",
 	auth=(api_key, api_secret),
 	files={'img_cmt': open(img_cmt_path, 'rb'), 'img_person': open(img_person_path, 'rb')})

print(response.json())

```

#### 3. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào json

**API**:

| Method | URL                                                                                       | content-type       |
| ------ | ----------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchingbase64` | `application/json` |

**Body**:

```json
{
  "img_cmt": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh chứng minh thư/thẻ căn cước
  "img_person": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh khuôn mặt cần so khớp
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
img_cmt_path = '/path/to/your/img_cmt.jpg'
img_person_path = '/path/to/your/img_person.jpg'
encode_cmt = get_byte_img(Image.open(img_cmt_path))
encode_person = get_byte_img(Image.open(img_person_path))
response = requests.post(
    "https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchingbase64",
    auth=(api_key, api_secret),
    json={'img_cmt' : encode_cmt, "img_person" : encode_person})
print(response.json())
```

#### 4. So khớp hai ảnh chân dung đầu vào url ảnh

**API**:

| Method | URL                                                                                      |
| ------ | ---------------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matching` |

**Params**:

| Key     | Value                           | Mô tả                      |
| ------- | ------------------------------- | -------------------------- |
| `face1` | `https://example.com/face1.png` | url ảnh chân dung thứ nhất |
| `face2` | `https://example.com/face2.png` | url ảnh chân dung thứ hai  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_face1 = 'link_url_face1'
img_face2 = 'link_url_face2'

response = requests.get("https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matching?face1=%s&face2=%s"
  % (img_face1, img_face2),
  auth=(api_key, api_secret))

print(response.json())
```

#### 5. So khớp hai ảnh chân dung đầu vào file ảnh

**API**:

| Method | URL                                                                                      | content-type          |
| ------ | ---------------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matching` | `multipart/form-data` |

**Body**:

| Key     | Type | Value               | Mô tả                       |
| ------- | ---- | ------------------- | --------------------------- |
| `face1` | file | `example_face1.jpg` | file ảnh chân dung thứ nhất |
| `face2` | file | `example_face2.jpg` | file ảnh chân dung thứ hai  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_face1_path = '/path/to/your/img_face1.jpg'
img_face2_path = '/path/to/your/img_face2.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matching",
 	auth=(api_key, api_secret),
 	files={'face1': open(img_face1_path, 'rb'), 'face2': open(img_face2_path, 'rb')})

print(response.json())

```

#### 6. So khớp hai ảnh chân dung đầu vào json

**API**:

| Method | URL                                                                                            | content-type       |
| ------ | ---------------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matchingbase64` | `application/json` |

**Body**:

```json
{
  "face1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh chân dung thứ nhất
  "face2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh chân dung thứ hai
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
img_face1_path = '/path/to/your/img_face1.jpg'
img_face2_path = '/path/to/your/img_face2.jpg'
encode_face1 = get_byte_img(Image.open(img_face1_path))
encode_face2 = get_byte_img(Image.open(img_face2_path))
response = requests.post(
    "https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/face_matchingbase64",
    auth=(api_key, api_secret),
    json={'face1' : encode_face1, "face2" : encode_face2})
print(response.json())
```

#### 7. Kiểm tra giả mạo khuôn mặt với đầu vào là 4 file ảnh, ảnh mặt thẳng, ảnh mặt quay trái, ảnh mặt quay phải, ảnh giấy tờ tùy thân

**API**:

| Method | URL                                                                                         | content-type          |
| ------ | ------------------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchingliveness` | `multipart/form-data` |

**Body**:

| Key       | Type | Value               | Mô tả                                                        |
| --------- | ---- | ------------------- | ------------------------------------------------------------ |
| `img_cmt` | file | `example_cmt.jpg`   | file ảnh chứng minh thư hoặc thẻ căn cước hoặc ảnh chân dung |
| `mid`     | file | `example_mid.jpg`   | file ảnh giữa khuôn mặt                                      |
| `left`    | file | `example_left.jpg`  | file ảnh mặt quay trái                                       |
| `right`   | file | `example_right.jpg` | file ảnh mặt quay phải                                       |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_mid = '/path/to/your/img_mid.jpg'
img_left = '/path/to/your/img_left.jpg'
img_right = '/path/to/your/img_right.jpg'
img_cmt  = '/path/to/your/img_cmt.jpg'

response = requests.post(  "https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchingliveness"
    auth=(api_key, api_secret),
    files={'mid': open(img_mid, 'rb'), 'left': open(img_left, 'rb'), 'right': open(img_right, 'rb'),
    'img_cmt' : open(img_cmt, 'rb')})

print(response.json())

```

#### 8. Kiểm tra giả mạo khuôn mặt với đầu vào là json của 4 ảnh dạng base64, ảnh mặt thẳng, ảnh mặt quay trái, ảnh mặt quay phải, ảnh giấy tờ tùy thân

**API**:

| Method | URL                                                                                               | content-type       |
| ------ | ------------------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchinglivenessbase64` | `application/json` |

**Body**:

```json
{
  "img_cmt": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh chứng minh thư/thẻ căn cước
  "mid": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh giữa khuôn mặt
  "left": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt quay trái
  "rihgt": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt quay phải
}
```

**Demo Python**:

```python

import requests
import io
import base64
from PIL import Image

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_mid = '/path/to/your/img_mid.jpg'
img_left = '/path/to/your/img_left.jpg'
img_right = '/path/to/your/img_right.jpg'
img_cmt  = '/path/to/your/img_cmt.jpg'
def get_byte_img(img):
  img_byte_arr = io.BytesIO()
  img.save(img_byte_arr, format='PNG')
  encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
  return encoded_img

encode_mid = get_byte_img(Image.open(img_mid))
encode_left = get_byte_img(Image.open(img_left))
encode_right = get_byte_img(Image.open(img_right))
encode_img_cmt = get_byte_img(Image.open(img_cmt))
response = requests.post(     "https://cloud.computervision.com.vn/backend/api/v1/request/face_matching/matchinglivenessbase64",
      auth=(api_key, api_secret),
      json={'mid' : encode_mid, 'left' : encode_left, 'right' : encode_right, 'img_cmt' : encode_img_cmt})

print(response.json())

```

#### 9. Thông tin trả về

Đối với dịch vụ so khớp khuôn mặt trong chứng minh thư, thẻ căn cước, phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": {
    "matching": string, // phần trăm giống nhau giữa hai ảnh đầu vào
    "img_cmt": string, // ảnh khuôn mặt chứng minh thư
    "img_person": string, // ảnh khuôn mặt chân dung
    "valid": string // False nếu ảnh chân dung mờ, che hoặc có dấu hiệu giả mạo, ngược lại True
  },
  "error_code": string, // mã lỗi
  "error_message": string // thông báo lỗi
}
```

Đối với dịch vụ so khớp hai ảnh chân dung, phản hồi sẽ một JSON với định dạng sau:

```json
{
  "data": {
    "matching": string, // phần trăm giống nhau giữa hai ảnh đầu vào
    "img_person1": string, // ảnh khuôn mặt chân dung thứ nhất
    "img_person2": string, // ảnh khuôn mặt chân dung thứ hai
    "valid": string, // False nếu ảnh chân dung mờ, che hoặc có dấu hiệu giả mạo, ngược lại True
    "match": string // 1: chắc chắn cùng một người, 2: nghi ngờ, 3: không cùng một người
  },
  "error_code": string, // mã lỗi
  "error_message": string // thông báo lỗi
}
```

Đối với dịch vụ kiểm tra giả mạo khuôn mặt, phản hồi sẽ một JSON với định dạng sau:

```json
{
  "data": {
    "matching": string, // phần trăm giống nhau
    "valid": string, // True trong trường hợp đầu vào không giả mạo, ngược lại False
    "errors": string // lỗi khi xác minh chống giả mạo
  },
  "error_code": string, // mã lỗi
  "error_message": string // thông báo lỗi
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                            |
| ------ | ---------------------------------- | -------------------------------- |
| 0      | Thành công                         | So khớp thành công               |
| 1      | Ảnh sai format                     | Upload ảnh bị lỗi khi dùng POST  |
| 2      | Url của ảnh không khả dụng         | Download ảnh bị lỗi khi dùng GET |
| 3      | Ảnh không chứa nội dung            | Tồn tại ảnh không có mặt người   |
| 4      | Api_key hoặc api_secret không đúng | Khi api_key hoặc api_secret sai  |
| 5      | Hết số lượng request hữu dụng      | Hết số lượng request             |
