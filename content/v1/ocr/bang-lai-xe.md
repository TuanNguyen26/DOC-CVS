---
title: 'Bằng lái xe'
metaTitle: 'Bằng lái xe'
stt: 29
---

### 1. Trích xuất thông tin bằng lái xe với đầu vào url ảnh

**API**:

| Method | URL                                                                          |
| ------ | ---------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx` |

**Params**:

| Key   | Value                         | Mô tả                                        |
| ----- | ----------------------------- | -------------------------------------------- |
| `url` | `https://example.com/blx.png` | Url ảnh bằng lái xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://daotaothanhcong.com/wp-content/uploads/2019/10/bang-lai-xe-b1-co-thoi-han-bao-lau.jpg'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 2. Trích xuất thông tin bằng lái xe với đầu vào file ảnh

**API**:

| Method | URL                                                                          | content-type          |
| ------ | ---------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx` | `multipart/form-data` |

**Body**:

| Key     | Type   | Value             | Mô tả                                         |
| ------- | ------ | ----------------- | --------------------------------------------- |
| `image` | `file` | `example_blx.jpg` | File ảnh bằng lái xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blx",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 3. Trích xuất thông tin bằng lái xe với đầu vào json

**API**:

| Method | URL                                                                                | content-type       |
| ------ | ---------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blxbase64` | `application/json` |

**Body**:

```json
{
  "image": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh cần trích xuất
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
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/blx/get_blxbase64",
    auth=(api_key, api_secret),
    json={'image' : encode_cmt})
print(response.json())
```

### 4. Trích xuất line text trong văn bản scan với đầu vào url ảnh.

**API**:

| Method | URL                                                                                      |
| ------ | ---------------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4` |

**Params**:

| Key   | Value                           | Mô tả                |
| ----- | ------------------------------- | -------------------- |
| `url` | `https://example.com/image.png` | Url ảnh văn bản scan |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 5. Trích xuất line text trong văn bản scan với đầu vào file ảnh

**API**:

| Method | URL                                                                                      | content-type          |
| ------ | ---------------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4` | `multipart/form-data` |

**Body**:

| Key     | Type   | Value         | Mô tả                                |
| ------- | ------ | ------------- | ------------------------------------ |
| `image` | `file` | `example.jpg` | File ảnh văn bản scan cần trích xuất |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/text_photostory/get_scan_a4",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 6. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "type": [xxxx],
  "data": [xxxx],
  "valid": string, // False nếu ảnh đầu vào mờ, che hoặc có dấu hiệu giả mạo, ngược lại True
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

_Chú ý_: Trường hợp trích xuất thông tin bằng lái xe và trích xuất từ file PDF không có trường `valid`.

`type`: Loại giấy tờ tùy thân được trích xuất thông tin, trong trường hợp `get_haimat` sẽ không có trường này.

- `blx` : Ứng với bằng lái xe.
- `pdf` : Ứng với upload file PDF.

`data`: Bao gồm các thông tin được trích xuất từ ảnh đầu vào có giấy tờ tùy thân, với mỗi loại giấy tờ tùy thân thì sẽ có những thông tin trả về khác nhau.

Bằng lái xe.

- `id` : Số thẻ.
- `name` : Họ và tên.
- `born` : Ngày sinh.
- `class` : Hạng.
- `nation` : Quốc tịch.
- `dateissue` : Ngày phát hành.
- `duedate` : Ngày hết hạn.
- `address` : Nơi cư trú.

Trong trường hợp `get_haimat`, `data` sẽ có gồm các thông tin sau:

```json
"data": {
  "mattruoc": [xxxx], // gồm các trường đã nếu ở trên
  "matsau": [xxxx] // gồm các trường đã nêu ở trên
}
```

Trong trường hợp trích xuất thông tin từ file PDF, `data` gồm các thông tin sau:

```json
"data": [
  {
    "type": [xxxx], // loại giấy tờ nhận dạng được, đã nêu ở trên
    "data": [xxxx], // các trường thông tin tương ứng với loại giây tờ
  },
  ...
]
```

Trong trường hợp trích xuất thông tin từ văn bản scan, phản hồi gồm các thông tin sau:

```json
{
  "result": [xxxx], // mảng các line text trong văn bản, nếu không có trả về null
  "time": [xxxx] // thời gian xử lý
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                |
| ------ | ---------------------------------- | ---------------------------------------------------- |
| 0      | Thành công                         | Trích xuất thông tin thành công                      |
| 1      | Ảnh không chứa nội dung            | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất |
| 2      | Url của ảnh không khả dụng         | Download ảnh bị lỗi khi dùng GET                     |
| 3      | Ảnh sai format                     | Upload ảnh bị lỗi khi dùng POST                      |
| 4      | Hết số lượng request hữu dụng      | Hết số lượng request                                 |
| 5      | Api_key hoặc api_secret không đúng | Khi api_key hoặc api_secret sai                      |
