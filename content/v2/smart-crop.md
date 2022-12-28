---
title: 'Smart Crop'
metaTitle: 'Smart Crop'
metaDescription: 'This is the api v2 for this page'
stt: 26
---

#### 1. Cắt ảnh thông minh với đầu vào url ảnh

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image` |

**Params**:

| Key      | Value                           | Mô tả                     |
| -------- | ------------------------------- | ------------------------- |
| `url`    | `https://example.com/image.png` | Url ảnh cần cắt           |
| `width`  | `400`                           | Chiều rộng của ảnh đầu ra |
| `height` | `600`                           | Chiều dài của ảnh đầu ra  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

img_url = 'link_url_img'
width = 400
height = 600

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image?url=%s&width=%s&height=%s"
  % (img_url, width, height),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 2. Cắt ảnh thông minh với đầu vào file ảnh

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image` | `multipart/form-data` |

**Params**:

| Key      | Value | Mô tả                     |
| -------- | ----- | ------------------------- |
| `width`  | `400` | Chiều rộng của ảnh đầu ra |
| `height` | `600` | Chiều dài của ảnh đầu ra  |

**Body**:

| Key   | Type   | Value         | Mô tả            |
| ----- | ------ | ------------- | ---------------- |
| `img` | `file` | `example.jpg` | File ảnh cần cắt |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = '/path/to/your/image.jpg'
width = 400
height = 600

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/smartcrop/crop_image?width=%s&height=%s"
  % (width, height),
 	auth=(api_key, api_secret),
 	files={'img': open(img_path, 'rb')})

print(response.json())

```

#### 3. Cắt ảnh thông minh tối ưu cho ảnh có một hoặc nhiều người, sử dụng đầu vào url ảnh

**API**:

| Method | URL                                                                |
| ------ | ------------------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person` |

**Params**:

| Key      | Value                           | Mô tả                     |
| -------- | ------------------------------- | ------------------------- |
| `url`    | `https://example.com/image.png` | Url ảnh cần cắt           |
| `width`  | `400`                           | Chiều rộng của ảnh đầu ra |
| `height` | `600`                           | Chiều dài của ảnh đầu ra  |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

img_url = 'link_url_img'
width = 400
height = 600

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person?url=%s&width=%s&height=%s"
  % (img_url, width, height),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 4. Cắt ảnh thông minh tối ưu cho ảnh có một hoặc nhiều người, sử dụng đầu vào file ảnh

**API**:

| Method | URL                                                                | content-type          |
| ------ | ------------------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person` | `multipart/form-data` |

**Params**:

| Key      | Value | Mô tả                     |
| -------- | ----- | ------------------------- |
| `width`  | `400` | Chiều rộng của ảnh đầu ra |
| `height` | `600` | Chiều dài của ảnh đầu ra  |

**Body**:

| Key   | Type   | Value         | Mô tả            |
| ----- | ------ | ------------- | ---------------- |
| `img` | `file` | `example.jpg` | File ảnh cần cắt |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_path = '/path/to/your/image.jpg'
width = 400
height = 600

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/smartcrop/crop_person?width=%s&height=%s"
  % (width, height),
 	auth=(api_key, api_secret),
 	files={'img': open(img_path, 'rb')})

print(response.json())

```

#### 5. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "url": [xxxx], // url ảnh kết quả
  "errorCode": int, // mã lỗi
  "errorMessage": string, // thông báo lỗi
  "invalidCode": int, // chỉ dùng cho crop_person, mã thông báo nếu mặt người trong ảnh bị che khuất
  "invalidMessage": string // chỉ dùng cho crop_person, thông báo nếu mặt người trong ảnh bị che khuất
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                           |
| ------ | ---------------------------------- | ------------------------------- |
| 0      | Success                            | Thành công                      |
| 1      | Incorrect image format             | Ảnh bị lỗi                      |
| 2      | Url is unavailable                 | Link ảnh bị lỗi                 |
| 3      | The photo does not contain content | Ảnh không chứa nội dung         |
| 4      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai |
| 4      | Out of requests                    | Hết số lượng request            |
| 6      | Error when processing the request  | Lỗi khi xử lý request           |

Bảng mã thông báo:

| Mã lỗi | Message                              | Mô tả                            |
| ------ | ------------------------------------ | -------------------------------- |
| 0      | Successful                           | Thành công                       |
| 1      | The photo does not contain face      | Ảnh không chứa khuôn mặt         |
| 2      | Photo contains more than one face    | Ảnh chứa nhiều hơn một khuôn mặt |
| 3      | Wearing sun glasses                  | Đeo kính đen                     |
| 4      | Wearing a hat                        | Đội mũ                           |
| 5      | Wearing a mask                       | Đeo khẩu trang                   |
| 6      | Tilt more than 15 degrees            | Nghiêng quá 15 độ                |
| 7      | Photo taken from picture, screen     | Ảnh chụp từ ảnh, màn hình        |
| 8      | The face in the picture is too small | Mặt trong ảnh quá nhỏ            |
