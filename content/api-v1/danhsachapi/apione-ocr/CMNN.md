---
title: 'CM/TCC/Passport'
id: 5
---

### 1. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào url ảnh

**API**:

| Method | URL                                                                             |
| ------ | ------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimat` |

**Params**:

| Key        | Value                              | Mô tả                                      |
| ---------- | ---------------------------------- | ------------------------------------------ |
| `mattruoc` | `https://example.com/mattruoc.png` | url ảnh mặt trước cần trích xuất thông tin |
| `matsau`   | `https://example.com/matsau.png`   | url ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

mattruoc_url = 'mat truoc url'
matsau_url = 'mat sau url'
response = requests.get(
"https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimat?mattruoc=%s&matsau=%s" % (mattruoc_url, matsau_url),
  auth=(api_key, api_secret))

print(response.json())

```

### 2. Trích xuất thông tin mặt trước chứng minh thư thẻ căn cước với đầu vào url ảnh

**API**:

| Method | URL                                                                               |
| ------ | --------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruoc` |

**Params**:

| Key   | Value                              | Mô tả                                      |
| ----- | ---------------------------------- | ------------------------------------------ |
| `url` | `https://example.com/mattruoc.png` | url ảnh mặt trước cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://vemaybaybackinh.net/assets/uploads/2019/01/thẻ-căn-cước.jpg'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruoc?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 3. Trích xuất thông tin mặt sau chứng minh thư thẻ căn cước với đầu vào url ảnh.

**API**:

| Method | URL                                                                             |
| ------ | ------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsau` |

**Params**:

| Key   | Value                            | Mô tả                                    |
| ----- | -------------------------------- | ---------------------------------------- |
| `url` | `https://example.com/mausau.png` | url ảnh mặt sau cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://vemaybaybackinh.net/assets/uploads/2019/01/thẻ-căn-cước.jpg'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsau?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 4. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào file ảnh

**API**:

| Method | URL                                                                             | content-type          |
| ------ | ------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimat` | `multipart/form-data` |

**Body**:

| Key        | Type | Value                  | Mô tả                                       |
| ---------- | ---- | ---------------------- | ------------------------------------------- |
| `mattruoc` | file | `example_mattruoc.jpg` | file ảnh mặt trước cần trích xuất thông tin |
| `matsau`   | file | `example_matsau.jpg`   | file ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
mattruoc_path = '/path/to/your/mattruoc.jpg'
matsau_path = '/path/to/your/matsau.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimat",
  auth=(api_key, api_secret),
  files={'mattruoc': open(mattruoc_path, 'rb'), 'matsau' : open(matsau_path, 'rb')})

print(response.json())

```

### 5. Trích xuất thông tin mặt trước chứng minh thư thẻ căn cước với đầu vào file ảnh

**API**:

| Method | URL                                                                               | content-type          |
| ------ | --------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruoc` | `multipart/form-data` |

**Body**:

| Key     | Type | Value                  | Mô tả                                       |
| ------- | ---- | ---------------------- | ------------------------------------------- |
| `image` | file | `example_mattruoc.jpg` | file ảnh mặt trước cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruoc",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 6. Trích xuất thông tin mặt sau chứng minh thư thẻ căn cước với đầu vào file ảnh

**API**:

| Method | URL                                                                             | content-type          |
| ------ | ------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsau` | `multipart/form-data` |

**Body**:

| Key     | Type | Value                | Mô tả                                     |
| ------- | ---- | -------------------- | ----------------------------------------- |
| `image` | file | `example_matsau.jpg` | file ảnh mặt sau cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsau",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 7. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào json

**API**:

| Method | URL                                                                                   | content-type       |
| ------ | ------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimatbase64` | `application/json` |

**Body**:

```json
{
  "mattruoc": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt trước
  "matsau": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt sau
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
img_mattruoc_path = "/path/to/your/img_mattruoc.jpg"
img_matsau_path = "/path/to/your/img_matsau.jpg"
encode_mattruoc = get_byte_img(Image.open(img_mattruoc_path))
encode_matsau = get_byte_img(Image.open(img_matsau_path))
response = requests.post(
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_haimatbase64",
    auth=(api_key, api_secret),
    json={'mattruoc' : encode_mattruoc, "matsau" : encode_matsau})
print(response.json())
```

### 8. Trích xuất thông tin mặt trước chứng minh thư thẻ căn cước với đầu vào json

**API**:

| Method | URL                                                                                     | content-type       |
| ------ | --------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruocbase64` | `application/json` |

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
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_mattruocbase64",
    auth=(api_key, api_secret),
    json={'image' : encode_cmt})
print(response.json())
```

### 9. Trích xuất thông tin mặt sau chứng minh thư thẻ căn cước với đầu vào json

**API**:

| Method | URL                                                                                   | content-type       |
| ------ | ------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsaubase64` | `application/json` |

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
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_matsaubase64",
    auth=(api_key, api_secret),
    json={'image' : encode_cmt})
print(response.json())
```

### 10. Trích xuất thông tin chứng minh thư, thẻ căn cước với đầu vào file PDF hoặc file ảnh

**API**:

| Method | URL                                                                           | content-type          |
| ------ | ----------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/v1/get_infor` | `multipart/form-data` |

**Body**:

| Key    | Type | Value         | Mô tả                                                                    |
| ------ | ---- | ------------- | ------------------------------------------------------------------------ |
| `file` | file | `example.pdf` | file PDF chứa ảnh CMND, thẻ căn cước, có thể gồm cả mặt trước và mặt sau |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
file_path = '/path/to/your/example.pdf'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/v1/get_infor",
  auth=(api_key, api_secret),
  files={'file': open(file_path, 'rb')})

print(response.json())

```

### 11. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào url ảnh.

**API**:

| Method | URL                                                                                |
| ------ | ---------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_all` |

**Params**:

| Key   | Value                           | Mô tả                                                                  |
| ----- | ------------------------------- | ---------------------------------------------------------------------- |
| `url` | `https://example.com/image.png` | url ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_all?url=%s" % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

### 12. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file ảnh

**API**:

| Method | URL                                                                                | content-type          |
| ------ | ---------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_all` | `multipart/form-data` |

**Body**:

| Key     | Type | Value         | Mô tả                                                                   |
| ------- | ---- | ------------- | ----------------------------------------------------------------------- |
| `image` | file | `example.jpg` | file ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_all",
  auth=(api_key, api_secret),
  files={'image': open(image_path, 'rb')})

print(response.json())

```

### 13. Trích xuất thông tin từ 1loại bất kỳ CMT mặt trước/mặt sau,CCCD mặt trước/mặt sau, Passport, đầu vào file json

**API**:

| Method | URL                                                                                      | content-type       |
| ------ | ---------------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_allbase64` | `application/json` |

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
    "https://cloud.computervision.com.vn/backend/api/v1/request/ocr/cmt/get_infor_allbase64",
    auth=(api_key, api_secret),
    json={'image' : encode_cmt})
print(response.json())
```
