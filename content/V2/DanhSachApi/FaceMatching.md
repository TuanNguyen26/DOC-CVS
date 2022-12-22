---
title: 'Face Matching'
metaTitle: 'Face Matching'
metaDescription: 'This is the api v21 for this page'
id: 4
---

Matching service là hệ thống AI cho phép so sánh độ tương đồng giữa khuôn mặt có trong chứng minh nhân dân, thẻ căn cước của người chủ sở hữu với khuôn mặt được chụp trực tiếp của cùng một người đó.

#### 1. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào url ảnh

**API**:

| Method | URL                                                             |
| ------ | --------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` |

**Params**:

| Key           | Value                              | Mô tả                                                           |
| ------------- | ---------------------------------- | --------------------------------------------------------------- |
| `img1`        | `https://example.com/card.png`     | url ảnh chứng minh thư hoặc thẻ căn cước                        |
| `img2`        | `https://example.com/portrait.png` | url ảnh khuôn mặt cần so khớp                                   |
| `type1`       | `portrait`/`card`                  | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `url`                              | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card = 'link_url_img_card'
img_portrait = 'link_url_portrait'

response = requests.get("https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?img1=%s&img2=%s&type1=%s&format_type=%s"
  % (img_card, img_portrait, 'card', 'url'),
  auth=(api_key, api_secret))

print(response.json())
```

#### 2. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào file ảnh

**API**:

| Method | URL                                                             | content-type          |
| ------ | --------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` | `multipart/form-data` |

**Params**:

| Key           | Value             | Mô tả                                                           |
| ------------- | ----------------- | --------------------------------------------------------------- |
| `type1`       | `portrait`/`card` | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `file`            | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

| Key    | Type | Value                  | Mô tả                                     |
| ------ | ---- | ---------------------- | ----------------------------------------- |
| `img1` | file | `example_card.jpg`     | file ảnh chứng minh thư hoặc thẻ căn cước |
| `img2` | file | `example_portrait.jpg` | file ảnh khuôn mặt cần so khớp            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
img_card_path = '/path/to/your/img_card.jpg'
img_portrait_path = '/path/to/your/img_portrait.jpg'

response = requests.post(
 	"https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?type1=%s&format_type=%s"
  % ('card', 'file'),
 	auth=(api_key, api_secret),
 	files={'img1': open(img_card_path, 'rb'), 'img2': open(img_portrait_path, 'rb')})

print(response.json())

```

#### 3. So khớp khuôn mặt ảnh trên CMND, CCCD và ảnh chân dung với đầu vào JSON

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/face_matching` | `application/json` |

**Params**:

| Key           | Value             | Mô tả                                                           |
| ------------- | ----------------- | --------------------------------------------------------------- |
| `type1`       | `portrait`/`card` | loại data của ảnh 1, nhận các giá trị: `portrait`, `card`       |
| `format_type` | `base64`          | loại data truyền vào, nhận các giá trị: `url`, `file`, `base64` |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh chứng minh thư/thẻ căn cước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh khuôn mặt cần so khớp
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
img_card_path = '/path/to/your/img_card.jpg'
img_portrait_path = '/path/to/your/img_portrait.jpg'
encode_card = get_byte_img(Image.open(img_card_path))
encode_portrait = get_byte_img(Image.open(img_portrait_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ekyc/face_matching?type1=%s&format_type=%s"
    % ('card', 'base64'),
    auth=(api_key, api_secret),
    json={'img1' : encode_card, "img2" : encode_portrait})
print(response.json())
```

#### 4. Thông tin trả về

Đối với dịch vụ so khớp khuôn mặt trong chứng minh thư, thẻ căn cước, phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": {
    "matching": string, // phần trăm giống nhau giữa hai ảnh đầu vào
    "face1": string, // ảnh khuôn mặt chứng minh thư
    "face2": string, // ảnh khuôn mặt chân dung
    "invalidCode": string, // mã cảnh báo
    "invalidMessage": string, // Cảnh báo nếu ảnh chân dung hoặc ảnh giấy tờ có dấu hiệu làm ảnh hưởng đến kết quả
    "match": string // 1 nếu phần trăm matching > 75%, 0 nếu phần trăm matching trong khoảng [65%, 75%], ngược lại -1
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | So khớp thành công                                                   |
| 1      | The photo does not contain content | Upload ảnh bị lỗi khi dùng POST                                      |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Tồn tại ảnh không có mặt người                                       |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã lỗi cảnh báo:

| invalidCode | invalidMessage                                                   | Mô tả                                                                              |
| ----------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 0           | Successful                                                       | Thành công                                                                         |
| 1           | The ID card photo is not existed                                 | Ảnh đầu vào không có giấy tờ tùy thân                                              |
| 2           | The picture is a photocopy version of the id card                | Ảnh giấy tờ tùy thân là bản photocopy                                              |
| 3           | The ID card photo is suspected of tampering                      | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo                                           |
| 4           | The ID card photo does not contain a face                        | Ảnh giấy tờ tùy thân không có mặt                                                  |
| 5           | The portrait photo does not contain a face                       | Ảnh chân dung không có mặt                                                         |
| 6           | Photo contains more than one face                                | Ảnh chứa nhiều hơn một mặt người                                                   |
| 7           | Wearing sunglasses                                               | Đeo kính đen                                                                       |
| 8           | Wearing a hat                                                    | Đội mũ                                                                             |
| 9           | Wearing a mask                                                   | Đeo khẩu trang                                                                     |
| 10          | Photo taken from picture, screen, blurred noise or sign of fraud | Ảnh chụp từ bức ảnh khác, màn hình thiết bị, bị mờ nhiễu hoặc có dấu hiệu gian lận |
| 11          | The face in the picture is too small                             | Mặt người trong ảnh quá nhỏ                                                        |
| 12          | The face in the portrait photo is too close to the margin        | Mặt người trong ảnh quá gần với lề                                                 |
