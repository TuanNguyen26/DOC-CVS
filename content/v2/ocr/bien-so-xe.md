---
title: 'Biển số xe'
metaTitle: 'Biển số xe'
stt: 5
---

#### 1. Trích xuất thông tin biển số xe với đầu vào url ảnh

**API**:

| Method | URL                                                            |
| ------ | -------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` |

**Params**:

| Key           | Value                         | Mô tả                                                       |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/blx.png` | url ảnh chụp biển số xe cần trích xuất thông tin            |
| `format_type` | `url`                         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin biển số xe với đầu vào file ảnh

**API**:

| Method | URL                                                            | content-type          |
| ------ | -------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                                        |
| ----- | ---- | ------------- | -------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh biển số xe cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin biển số xe với đầu vào json

**API**:

| Method | URL                                                            | content-type       |
| ------ | -------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh biển số xe đã được cắt và căn chỉnh              |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_plate?format_type=base64&get_thumb=false",
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

Biển số xe: Trả về một danh sách, mỗi phần từ trong danh sách gồm

- plate: biển số xe.
- image: ảnh đã cắt ra và căn chỉnh của biển số xe.
