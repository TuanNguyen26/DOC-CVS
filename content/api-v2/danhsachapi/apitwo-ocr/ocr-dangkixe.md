---
title: 'Đăng kí xe'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
id: 21
metaDescription: 'This is the api v2 for this page'
---

#### 1. Trích xuất thông tin hai mặt đăng ký xe với đầu vào url ảnh

**API**:

| Method | URL                                                                    |
| ------ | ---------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img1`        | `https://example.com/front.png` | url ảnh mặt trước cần trích xuất thông tin                  |
| `img2`        | `https://example.com/back.png`  | url ảnh mặt sau cần trích xuất thông tin                    |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

front_url = 'sample front url'
back_url = 'sample back url'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?img1=%s&img2=%s&format_type=%s&get_thumb=%s"
  % (front_url, back_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin hai mặt đăng ký xe với đầu vào file ảnh

**API**:

| Method | URL                                                                    | content-type          |
| ------ | ---------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key    | Type | Value               | Mô tả                                       |
| ------ | ---- | ------------------- | ------------------------------------------- |
| `img1` | file | `example_front.jpg` | file ảnh mặt trước cần trích xuất thông tin |
| `img2` | file | `example_back.jpg`  | file ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
front_path = '/path/to/your/example_front.jpg'
back_path = '/path/to/your/example_back.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img1': open(front_path, 'rb'), 'img2' : open(back_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin hai mặt đăng ký xe với đầu json

**API**:

| Method | URL                                                                    | content-type       |
| ------ | ---------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt trước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt sau
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
img_front_path = "/path/to/your/img_front.jpg"
img_back_path = "/path/to/your/img_back.jpg"
encode_front = get_byte_img(Image.open(img_front_path))
encode_back = get_byte_img(Image.open(img_back_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img1' : encode_front, "img2" : encode_back})
print(response.json())
```

#### 4. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào url ảnh

**API**:

| Method | URL                                                                   |
| ------ | --------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url ảnh mặt trước hoặc mặt sau của đăng ký xe               |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 5. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào file ảnh

**API**:

| Method | URL                                                                   | content-type          |
| ------ | --------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                                              |
| ----- | ---- | ------------- | -------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh của mặt trước hoặc mặt sau của đăng ký xe |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 6. Trích xuất thông tin một mặt bất kì của đăng ký xe với đầu vào json

**API**:

| Method | URL                                                                   | content-type       |
| ------ | --------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registration?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 7. Thông tin trả về

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

Bằng lái xe:

- id: số thẻ.
- name: họ và tên.
- dob: ngày sinh.
- class: hạng.
- nationality: quốc tịch.
- issue_date: ngày phát hành.
- due_date: ngày hết hạn.
- address: nơi cư trú.
- image: ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước đăng ký xe:

- name: tên chủ sở hữu xe.
- address: nơi cư trú.
- id: id đăng ký xe.
- plate: biển số xe.
- issued_at: nơi cấp.
- image: ảnh mặt trước đăng ký xe.
- Mặt sau đăng ký xe:
- name: tên chủ sở hữu xe.
- address: nơi cư trú.
- engine: số máy.
- chassis: số khung.
- brand: nhãn hiệu.
- model: số loại.
- color: màu sơn.
- capacity: dung tích.
- issued_at: nơi đăng ký.
- last_issue_date: ngày đăng ký cuối cùng.
- first_issue_date: ngày đăng ký đầu tiên.
- plate: biển số xe.
- pay_load: trọng tải.
- image: ảnh mặt sau đăng ký xe.

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | ncorrect format type               | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã cảnh báo:

| Mã lỗi | Message                                                         | Mô tả                                             |
| ------ | --------------------------------------------------------------- | ------------------------------------------------- |
| 0      | uccessful                                                       | Thành công                                        |
| 1      | Photo contains sign of being taken through an electronic screen | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo          |
| 2      | The picture is a photocopy version of the id card               | Ảnh giấy tờ tùy thân là bản photocopy             |
| 3      | The id field on the document is incorrectly formatted           | Trường id trên giấy tờ tùy thân không đúng format |
| 4      | The mrzcode on the passport is incorrectly formatted            | MRZ code trên passport không đúng format          |
| 5      | The id card's corner has been clipped                           | Giấy tờ tùy thân bị cắt góc                       |
