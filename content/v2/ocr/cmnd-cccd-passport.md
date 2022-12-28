---
title: 'CMND - CCCD - Passport'
metaTitle: 'CMND - CCCD - Passport'
stt: 3
---

#### 1. Trích xuất thông tin hai mặt chứng minh nhân dân, căn cước công dân với đầu vào url ảnh

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

#### 2. Trích xuất thông tin hai mặt chứng minh nhân dân, căn cước công dân với đầu vào file ảnh

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

| Key    | Type   | Value               | Mô tả                                                            |
| ------ | ------ | ------------------- | ---------------------------------------------------------------- |
| `img1` | `file` | `example_front.jpg` | File ảnh mặt trước cần trích xuất thông tin với format_type=file |
| `img2` | `file` | `example_back.jpg`  | File ảnh mặt sau cần trích xuất thông tin với format_type=file   |

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

#### 3. Trích xuất thông tin hai mặt chứng minh nhân dân, căn cước công dân với đầu vào json

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

#### 4. Trích xuất thông tin ảnh có chứa 1 hoặc nhiều mặt của CMND, CCCD, Passport, đầu vào url ảnh

**API**:

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                   |
| ------------- | ------------------------------- | ----------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url ảnh bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`             |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                    |

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

#### 5. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMND, CCCD, Passport, đầu vào file ảnh hoặc file PDF

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

| Key   | Type   | Value         | Mô tả                                                                    |
| ----- | ------ | ------------- | ------------------------------------------------------------------------ |
| `img` | `file` | `example.jpg` | File ảnh bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

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

#### 6. Trích xuất thông tin từ ảnh có chứa 1 hoặc nhiều mặt của CMND, CCCD, Passport, đầu vào json

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

#### 7. Trích xuất thông tin từ 1 loại bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào url ảnh.

**API**:

| Method | URL                                                    |
| ------ | ------------------------------------------------------ |
| GET    | `https://cloud.computervision.com.vn/api/v2/ekyc/card` |

**Params**:

| Key           | Value                           | Mô tả                                                                   |
| ------------- | ------------------------------- | ----------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url ảnh bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`             |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh giấy tờ tùy thân đã được cắt và căn chỉnh                    |

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

#### 8. Trích xuất thông tin từ 1 loại bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file ảnh hoặc file PDF

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

| Key   | Type   | Value         | Mô tả                                                                    |
| ----- | ------ | ------------- | ------------------------------------------------------------------------ |
| `img` | `file` | `example.jpg` | File ảnh bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport |

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

#### 9. Trích xuất thông tin từ 1 loại bất kỳ CMND mặt trước/mặt sau, CCCD mặt trước/mặt sau, Passport, đầu vào file json

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

Phản hồi chung sẽ là một JSON với định dạng sau:

```json
{
  "data": [xxxx],
  "errorCode": string,  // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

Trong trường hợp nhận dạng sử dụng `/ekyc`, trường `data` sẽ gồm các thông tin sau:

```json
{
  "info": [xxxx],
  "valid": [xxxx],
  "invalidMessage": [xxxx],
  "invalidCode": [xxxx],
  "type": [xxxx]
}
```

Chú ý: Trường hợp trích xuất thông tin từ file PDF nhiều loại giấy tờ tùy thân trong 1 ảnh ,không có trường `valid`, `invalidCode`, `invalidMessage`.

Mặt trước chứng minh nhân dân - `9_id_card_front`

- `id`: Số chứng minh nhân dân.
- `name`: Họ và tên.
- `dob`: Ngày sinh.
- `hometown`: Quê quán.
- `address`: Thường trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `id_confidence`: Độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence`: Độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence`: Độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence`: Độ tin cậy của thông tin trích xuất quê quán.
- `address_confidence`: Độ tin cậy của thông tin trích xuất thường trú.
- `id_box`: Box trường Số thẻ format [xmin, ymin, xmax, ymax].
- `name_box`: Box trường họ và tên format [xmin, ymin, xmax, ymax].
- `dob_box`: Box trường ngày sinh format [xmin, ymin, xmax, ymax].
- `hometown_box`: Box trường quê quán format [xmin, ymin, xmax, ymax].
- `address_box`: Box trường thường trú format [xmin, ymin, xmax, ymax].
- `image`: Ảnh đã căn chỉnh dạng string base64.

Mặt trước căn cước công dân - `12_id_card_front`

- `id`: Số thẻ.
- `name`: Họ và tên.
- `dob`: Ngày sinh.
- `hometown`: Quê quán
- `gender`: Giới tính.
- `due_date`: Ngày hết hạn.
- `nationality`: Quốc tịch.
- `ethnicity`: Dân tộc.
- `address`: Thường trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `id_confidence`: Độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence`: Độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence`: Độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence`: Độ tin cậy của thông tin trích xuất quê quán.
- `gender_confidence`: Độ tin cậy của thông tin trích xuất giới tính.
- `due_date_confidence`: Độ tin cậy của thông tin trích xuất ngày hết hạn.
- `nationality_confidence`: Độ tin cậy của thông tin trích xuất quốc tịch.
- `ethnicity_confidence`: Độ tin cậy của thông tin trích xuất dân tộc.
- `address_confidence`: Độ tin cậy của thông tin trích xuất thường trú.
- `id_box`: Box trường Số thẻ format [xmin, ymin, xmax, ymax].
- `name_box`: Box trường Họ và tên format [xmin, ymin, xmax, ymax].
- `dob_box`: Box trường Ngày sinh format [xmin, ymin, xmax, ymax].
- `hometown_box`: Box trường Quê quán format [xmin, ymin, xmax, ymax].
- `gender_box`: Box trường Giới tính format [xmin, ymin, xmax, ymax].
- `due_date_box`: Box trường Ngày hết hạn format [xmin, ymin, xmax, ymax].
- `nationality_box`: Box trường Quốc tịch format [xmin, ymin, xmax, ymax].
- `ethnicity_box`: Box trường Dân tộc format [xmin, ymin, xmax, ymax].
- `address_box`: Box trường Thường trú format [xmin, ymin, xmax, ymax].

Mặt trước căn cước công dân gán chip - `chip_id_card_front`

- `id`: Số thẻ.
- `name`: Họ và tên.
- `dob`: Ngày sinh.
- `hometown`: Quê quán
- `gender`: Giới tính.
- `due_date`: Ngày hết hạn.
- `nationality`: Quốc tịch.
- `address`: Thường trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `id_confidence`: Độ tin cậy của thông tin trích xuất số thẻ.
- `name_confidence`: Độ tin cậy của thông tin trích xuất họ và tên.
- `dob_confidence`: Độ tin cậy của thông tin trích xuất ngày sinh.
- `hometown_confidence`: Độ tin cậy của thông tin trích xuất quê quán.
- `gender_confidence`: Độ tin cậy của thông tin trích xuất giới tính.
- `due_date_confidence`: Độ tin cậy của thông tin trích xuất ngày hết hạn.
- `nationality_confidence`: Độ tin cậy của thông tin trích xuất quốc tịch.
- `address_confidence`: Độ tin cậy của thông tin trích xuất thường trú.
- `id_box`: Box trường Số thẻ format [xmin, ymin, xmax, ymax].
- `name_box`: Box trường Họ và tên format [xmin, ymin, xmax, ymax].
- `dob_box`: Box trường Ngày sinh format [xmin, ymin, xmax, ymax].
- `hometown_box`: Box trường Quê quán format [xmin, ymin, xmax, ymax].
- `gender_box`: Box trường Giới tính format [xmin, ymin, xmax, ymax].
- `due_date_box`: Box trường Ngày hết hạn format [xmin, ymin, xmax, ymax].
- `nationality_box`: Box trường Quốc tịch format [xmin, ymin, xmax, ymax].
- `address_box`: Box trường Thường trú format [xmin, ymin, xmax, ymax].
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân - `9_id_card_back`

- `ethnicity`: Dân tộc.
- `issue_date`: Ngày cấp.
- `religious`: Tôn giáo.
- `issued_at`: Nơi cấp
- `issued_at_town`: Tỉnh/thành phố nơi cấp.
- `issued_at_code`: Mã tỉnh/thành phố nơi cấp.
- `identification_sign`: Dấu vết.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence`: Độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence`: Độ tin cậy của thông tin trích xuất nơi cấp.
- `religious_confidence`: Độ tin cậy của thông tin trích xuất tôn giáo.
- `ethnicity_confidence`: Độ tin cậy của thông tin trích xuất dân tộc.
- `identification_sign_confidence`: độ tin cậy dấu vết.
- `issue_date_box`: Box trường Ngày cấp format [xmin, ymin, xmax, ymax].
- `issued_at_box`: Box trường Nơi cấp format [xmin, ymin, xmax, ymax].
- `religious_box`: Box trường Tôn giáo format [xmin, ymin, xmax, ymax].
- `ethnicity_box`: Box trường Dân tộc format [xmin, ymin, xmax, ymax].
- `identification_sign_confidence`: Box trường Dấu vết format [xmin, ymin, xmax, ymax].

Mặt sau căn cước công dân - `12_id_card_back`

- `issue_date`: Ngày cấp.
- `issued_at`: Nơi cấp.
- `identification_sign`: Dấu vết.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `issue_date_confidence`: Độ tin cậy của thông tin trích xuất ngày cấp.
- `issued_at_confidence`: Độ tin cậy của thông tin trích xuất nơi cấp.
- `identification_sign_confidence`: Độ tin cậy dấu vết.
- `issue_date_box`: Box trường Ngày cấp format [xmin, ymin, xmax, ymax].
- `issued_at_box`: Box trường Nơi cấp format [xmin, ymin, xmax, ymax].
- `identification_sign_box`: Box trường Dấu vết format [xmin, ymin, xmax, ymax].

Mặt sau căn cước công dân gán chip - `chip_id_card_back`

- `issue_date`: Ngày cấp.
- `issued_at`: Nơi cấp.
- `country`: Quốc gia.
- `document_number`: Id mặt sau.
- `person_number`: Id mặt trước.
- `dob`: Ngày sinh.
- `gender`: Giới tính.
- `due_date`: Ngày hết hạn.
- `nationality`: Quốc tịch.
- `sur_name`: Họ.
- `given_name`: Tên.
- `identification_sign`: Dấu vết.
- `identification_sign_confidence`: Độ tin cậy dấu vết.
- `issue_date_confidence`: Độ tin cậy của thông tin trích xuất ngày cấp.
- `issue_date_box`: Box trường Ngày cấp format [xmin, ymin, xmax, ymax].
- `identification_sign_box`: Box trường Dấu vết format [xmin, ymin, xmax, ymax].
- `mrz_confidence`: độ tin cậy của thông tin đọc mrz code.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Passport - `passport`

Chú ý: Nếu là passport Việt Nam sẽ ưu tiên đọc các trường tiếng việt phía trên. Còn với passport quốc tế sẽ đọc phần `mrzcode`. Với các trường trích xuất từ tiếng Việt sẽ có `confidence` và `box` đi theo. Còn đọc theo `mrz code` sẽ có `mrz_confindence`.

- `id`: Passport id.
- `id_confidence`: Độ tin cậy passport id.
- `id_box`: Box trường passport id format [xmin, ymin, xmax, ymax].
- `sur_name`: Họ.
- `given_name`: Tên.
- `full_name`: Họ và tên đầy đủ.
- `full_name_confidence`: Độ tin cậy họ và tên đầy đủ.
- `full_name_box`: Box trường họ tên đầy đủ id format [xmin, ymin, xmax, ymax].
- `dob`: Ngày sinh.
- `dob_confidence`: Độ tin cậy ngày sinh.
- `dob_box`: Box trường ngày sinh format [xmin, ymin, xmax, ymax].
- `gender`: Giới tính.
- `gender_confidence`: Độ tin cậy giới tính.
- `gender_box`: Box trường giới tính format [xmin, ymin, xmax, ymax].
- `country`: Quốc gia.
- `nationality`: Quốc tịch.
- `nationality_confidence`: Độ tin cậy quốc tịch.
- `nationality_box`: Box trường quốc tịch format [xmin, ymin, xmax, ymax].
- `due_date`: Ngày hết hạn.
- `due_date_confidence`: Độ tin cậy ngày hết hạn.
- `due_date_box`: Box trường ngày hết hạn format [xmin, ymin, xmax, ymax].
- `person_number`: Mã số công dân.
- `person_number_confidence`: Độ tin cậy mã số công dân.
- `Person_number_box`: Box trường mã số công dân format [xmin, ymin, xmax, ymax].
- `issue_date`: Ngày cấp.
- `issue_date_confidence`: Độ tin cậy ngày cấp.
- `issue_date_box`: Box trường ngày cấp format [xmin, ymin, xmax, ymax].
- `issued_at`: Nơi cấp.
- `issued_at_confidence`: Độ tin cậy nơi cấp.
- `issued_at_box`: Box trường nơi cấp format [xmin, ymin, xmax, ymax].
- `place_of_birth`: Nơi sinh.
- `place_of_birth_confidence`: Độ tin cậy nơi sinh.
- `place_of_birth_box`: Box trường nơi sinh format [xmin, ymin, xmax, ymax].
- `image`: Ảnh passport.
- `confidence`: Độ tin cậy của thông tin phát hiện được trong passport.

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

| Invalid Code | Message                                                         | Mô tả                                             |
| ------------ | --------------------------------------------------------------- | ------------------------------------------------- |
| 0            | Successful                                                      | Thành công                                        |
| 1            | Photo contains sign of being taken through an electronic screen | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo          |
| 2            | The picture is a photocopy version of the id card               | Ảnh giấy tờ tùy thân là bản photocopy             |
| 3            | The id field on the document is incorrectly formatted           | Trường id trên giấy tờ tùy thân không đúng format |
| 4            | The mrzcode on the passport is incorrectly formatted            | MRZ code trên passport không đúng format          |
| 5            | The id card's corner has been clipped                           | Giấy tờ tùy thân bị cắt góc                       |
| 6            | The id card's corner has been missing                           | Giấy tờ tùy thân bị chụp sát góc                  |
