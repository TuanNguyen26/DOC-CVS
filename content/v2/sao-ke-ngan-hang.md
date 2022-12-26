---
title: 'Sao kê ngân hàng'
metaTitle: 'Sao kê ngân hàng'
metaDescription: 'This is the api v2 for this page'
stt: 25
---

#### 1. Trích xuất thông tin Sao kê ngân hàng với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                      |
| ------ | ------------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Sao kê ngân hàng với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                      | content-type          |
| ------ | ------------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

**Body**:

| Key   | Type   | Value         | Mô tả                                  |
| ----- | ------ | ------------- | -------------------------------------- |
| `img` | `file` | `example.jpg` | file ảnh hoặc pdf của Sao kê ngân hàng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Sao kê ngân hàng với đầu vào json

**API**:

| Method | URL                                                                      | content-type       |
| ------ | ------------------------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Sao kê ngân hàng đã được căn chỉnh           |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/document/bank_statement?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Mỗi phần tử trong mảng `data` (tương ứng với từng trang được trích xuất) sẽ là một JSON với định dạng sau:

```json
{
  "image_table": array, // danh sách ảnh của bảng trong trang
  "json": array, // danh sách thông tin tương ứng với từng ảnh trong image_table
}
```

Mỗi phần tử trong mảng `json` có cấu trúc như sau:

```json
[
  [json_0, json_1, json_2, json_3, json_4], // biểu thị từng row
  [...],
  ...
]
```

Trong đó:

- `json_0` : Thông tin trường Ngày
- `json_1` : Thông tin trường Mô tả
- `json_2` : Thông tin trường Nợ
- `json_3` : Thông tin trường Có
- `json_4` : Thông tin trường Số dư

Mỗi json này có cấu trúc như sau:

```json
{
  "value": // Giá trị text trong ô
  "score": // Độ tin cậy
  "box": // Ví trí của ô trong bảng
}
```
