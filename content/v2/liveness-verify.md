---
title: 'Liveness Verify'
metaTitle: 'Livencess Verify'
metaDescription: 'This is the api v2 for this page'
stt: 23
---

#### 1. Thực hiện eKYC sử dụng ảnh chụp chân dung người dùng ở 3 góc độ

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/verify_liveness` | `multipart/form-data` |

**Body**:

| Key              | Type   | Value           | Mô tả                                   |
| ---------------- | ------ | --------------- | --------------------------------------- |
| `portrait_left`  | `file` | `example_1.jpg` | File ảnh quay trái của người dùng       |
| `portrait_mid`   | `file` | `example_2.jpg` | File ảnh chụp chính diện của người dùng |
| `portrait_right` | `file` | `example_3.jpg` | File ảnh quay phải của người dùng       |

```json
Body:
{
  "portrait_right": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh quay phải.
  "portrait_mid": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh chính diện.
  "portrait_left": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh quay trái.
} // với trường hợp format_type=base64 với phương thức POST.
```

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img1_path = '/path/to/your/example_1.jpg'
img2_path = '/path/to/your/example_2.jpg'
img3_path = '/path/to/your/example_3.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/ekyc/verify_liveness",
 	auth=(api_key, api_secret),
 	files={ 'portrait_left': open(img1_path, 'rb'),
            'portrait_mid': open(img2_path, 'rb'),
            'portrait_right': open(img3_path, 'rb')
        })

print(response.json())

```

#### 2. Thông tin trả về

Thông tin trả về của API Liveness Verify là một JSON với định dạng sau:

```json
{
  "data": {
    "invalidCode": string, // mã cảnh báo
    "invalidMessage": string, // cảnh báo nếu ảnh chân dung hoặc ảnh giấy tờ có dấu hiệu làm ảnh hưởng đến kết quả
    "matching_mid_left": string,
    "matching_mid_right": string,
    "valid": string // (True/False)
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Bảng mã lỗi cảnh báo:

| invalidCode | invalidMessage                                 | Mô tả                                                           |
| ----------- | ---------------------------------------------- | --------------------------------------------------------------- |
| 0           | Successful                                     | Thành công                                                      |
| 1           | The mid image does not contain face            | Ảnh chụp chính diện không chứa khuôn mặt                        |
| 2           | The left image does not contain face           | Ảnh chụp quay trái không chứa khuôn mặt                         |
| 3           | The right image does not contain face          | Ảnh chụp quay phải không chứa khuôn mặt                         |
| 4           | The mid image and the left image do not match  | Khuôn mặt ảnh chụp chính diện và quay trái không cùng một người |
| 5           | The mid image and the right image do not match | Khuôn mặt ảnh chụp chính diện và quay phải không cùng một người |
| 6           | Invalid center image                           | Ảnh chụp chính diện không hợp lệ                                |
| 7           | Invalid left image                             | Ảnh chụp quay trái không hợp lệ                                 |
| 8           | Invalid right image                            | Ảnh chụp quay phải không hợp lệ                                 |
