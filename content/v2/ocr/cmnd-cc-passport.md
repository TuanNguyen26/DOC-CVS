---
title: 'Chứng minh nhân dân - Căn cước - Passport'
metaTitle: 'Chứng minh nhân dân - Căn cước - Passport'
stt: 6
---

#### 1. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào url ảnh

**API**:

| Method | URL                                                     |
| ------ | ------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img1`        | `https://example.com/front.png` | Url ảnh mặt trước cần trích xuất thông tin                  |
| `img2`        | `https://example.com/back.png`  | Url ảnh mặt sau cần trích xuất thông tin                    |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

front_url = 'sample front url'
back_url = 'sample back url'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ekyc/cards?img1=%s&img2=%s&format_type=%s&get_thumb=%s"
  % (front_url, back_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào file ảnh

**API**:

| Method | URL                                                     | content-type          |
| ------ | ------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key    | Type   | Value               | Mô tả                                       |
| ------ | ------ | ------------------- | ------------------------------------------- |
| `img1` | `file` | `example_front.jpg` | File ảnh mặt trước cần trích xuất thông tin |
| `img2` | `file` | `example_back.jpg`  | File ảnh mặt sau cần trích xuất thông tin   |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
front_path = '/path/to/your/example_front.jpg'
back_path = '/path/to/your/example_back.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ekyc/cards?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img1': open(front_path, 'rb'), 'img2' : open(back_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin hai mặt chứng minh thư thẻ căn cước với đầu vào json

**API**:

| Method | URL                                                     | content-type       |
| ------ | ------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/cards` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

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
    "https://cloud.computervision.com.vn/api/v2/ekyc/cards?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img1' : encode_front, "img2" : encode_back})
print(response.json())
```

#### 4. Trích xuất thông tin ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào url ảnh

**API**:

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                  |
| ------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`            |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                   |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'
response = requests.get(
"https://cloud.computervision.com.vn/api/v2/ocr/card?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 5. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào file ảnh hoặc file PDF

**API**:

| Method | URL                                                   | content-type          |
| ------ | ----------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/card` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key   | Type   | Value         | Mô tả                                                                   |
| ----- | ------ | ------------- | ----------------------------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/card?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 6. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMT, CCCD, Passport, đầu vào json

**API**:

| Method | URL                                                   | content-type       |
| ------ | ----------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/card` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

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
img_path = "/path/to/your/image.jpg"
encode_img = get_byte_img(Image.open(img_path))
response = requests.post(
    "https://cloud.computervision.com.vn/api/v2/ocr/card?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_img})
print(response.json())
```

#### 7. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào url ảnh.

**API**:

| Method | URL                                                    |
| ------ | ------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                  |
| ------------- | ------------------------------- | ---------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`            |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                   |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ekyc/card?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 8. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file ảnh hoặc file PDF

**API**:

| Method | URL                                                    | content-type          |
| ------ | ------------------------------------------------------ | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/card` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

**Body**:

| Key   | Type   | Value         | Mô tả                                                                   |
| ----- | ------ | ------------- | ----------------------------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ekyc/card?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 9. Trích xuất thông tin từ 1 loại bất kỳ CMT mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file json

**API**:

| Method | URL                                                    | content-type       |
| ------ | ------------------------------------------------------ | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ekyc/card` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh        |

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
    "https://cloud.computervision.com.vn/api/v2/ekyc/card?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 10. Thông tin trả về

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

type: Loại giấy tờ tùy thân được trích xuất thông tin.

- `9_id_card_front` : Ứng với mặt trước của chứng minh nhân dân.
- `12_id_card_front` : Ứng với mặt trước thẻ căn cước công dân.
- `chip_id_card_front` : Ứng với mặt trước thẻ căn cước công dân gán chip.
- `9_id_card_back` : Ứng với mặt sau của chứng minh nhân dân.
- `12_id_card_back` : Ứng với mặt sau của thẻ căn cước.
- `chip_id_card_back` : Ứng với mặt sau thẻ căn cước công dân gán chip.
- `driving_license` : Ứng với bằng lái xe.
- `passport` : Ứng với loại giấy tờ là hộ chiếu.
- `vehicle_registration_front` : Ứng với mặt trước của giấy đăng ký xe.
- `vehicle_registration_back` : Ứng với mặt sau của giấy đăng ký xe.
- `picertificate` : Ứng với đăng kiểm xe.

`info` : Bao gồm các thông tin được trích xuất từ ảnh đầu vào có giấy tờ tùy thân, với mỗi loại giấy tờ tùy thân thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân:

- `id` : Số chứng minh thư.
- `name` : Họ và tên.
- `dob` : Ngày sinh.
- `hometown` : Quê quán.
- `address` : Thường trú.
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `id_confidence` : Độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence` : Độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence` : Độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence` : Độ tin cậy của thông tin trích xuất quê quán.
- `address_confidence` : Độ tin cậy của thông tin trích xuất thường trú.

Mặt trước thẻ căn cước công dân:

- `id` : Số thẻ.
- `name` : Họ và tên.
- `dob` : Ngày sinh.
- `hometown` : Quê quán
- `gender` : Giới tính.
- `due_date` : Ngày hết hạn.
- `nationality` : Quốc tịch.
- `ethnicity` : Dân tộc.
- `address` : Thường trú.
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `id_confidence` : Độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence` : Độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence` : Độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence` : Độ tin cậy của thông tin trích xuất quê quán.
- `gender_confidence` : Độ tin cậy của thông tin trích xuất giới tính.
- `due_date_confidence` : Độ tin cậy của thông tin trích xuất ngày hết hạn.
- `nationality_confidence` : Độ tin cậy của thông tin trích xuất quốc tịch.
- `ethnicity_confidence` : Độ tin cậy của thông tin trích xuất dân tộc.
- `address_confidence` : Độ tin cậy của thông tin trích xuất thường trú.

Mặt trước thẻ căn cước công dân gán chip:

- `id` : Số thẻ.
- `name` : Họ và tên.
- `dob` : Ngày sinh.
- `hometown` : Quê quán
- `gender` : Giới tính.
- `due_date` : Ngày hết hạn.
- `nationality` : Quốc tịch.
- `address` : Thường trú.
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân:

- `ethnicity` : Dân tộc.
- `issue_date` : Ngày cấp.
- `religious` : Tôn giáo.
- `issued_at` : Nơi cấp
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence` : Độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence` : Độ tin cậy của thông tin trích xuất nơi cấp.
- `religious_confidence` : Độ tin cậy của thông tin trích xuất tôn giáo.
- `ethnicity_confidence` : Độ tin cậy của thông tin trích xuất dân tộc.

Mặt sau thẻ căn cước công dân:

- `issue_date` : Ngày cấp.
- `issued_at` : Nơi cấp.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence` : Độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence` : Độ tin cậy của thông tin trích xuất nơi cấp.

Mặt sau thẻ căn cước công dân gán chip:

- `issue_date` : Ngày cấp.
- `issued_at` : Nơi cấp.
- `country` : Quốc gia.
- `document_number` : Id mặt sau.
- `person_number` : Id mặt trước.
- `dob` : Ngày sinh.
- `gender` : Giới tính.
- `due_date` : Ngày hết hạn.
- `nationality` : Quốc tịch.
- `sur_name` : Họ.
- `given_name` : Tên.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Passport:

- `id` : Passport id.
- `sur_name` : Họ.
- `given_name` : Tên.
- `dob` : Ngày sinh.
- `gender` : Giới tính.
- `country` : Quốc gia.
- `nationality` : Quốc tịch.
- `due_date` : Ngày hết hạn.
- `person_number` : Mã số công dân.
- `image` : Ảnh passport.
- `confidence` : Độ tin cậy của thông tin phát hiện được trong passport.

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
