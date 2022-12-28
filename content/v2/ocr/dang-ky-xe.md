---
title: 'Đăng ký xe'
metaTitle: 'Đăng ký xe'
stt: 8
---

#### 1. Trích xuất thông tin hai mặt đăng ký xe với đầu vào url ảnh

**API**:

| Method | URL                                                                    |
| ------ | ---------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_registrations` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img1`        | `https://example.com/front.png` | Url ảnh mặt trước cần trích xuất thông tin                  |
| `img2`        | `https://example.com/back.png`  | Url ảnh mặt sau cần trích xuất thông tin                    |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

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
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key    | Type   | Value               | Mô tả                                                                               |
| ------ | ------ | ------------------- | ----------------------------------------------------------------------------------- |
| `img1` | `file` | `example_front.jpg` | File ảnh mặt trước cần trích xuất thông tin với format_type=file, phương thức POST. |
| `img2` | `file` | `example_back.jpg`  | File ảnh mặt sau cần trích xuất thông tin với format_type=file, Phương thức POST    |

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
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

```json
{
  "img1": "iVBORw0KGgoAAAANSU...", // string base64 của ảnh mặt trước
  "img2": "iVBORw0KGgoAAAANSU..." // string base64 của ảnh mặt sau
} // với trường hợp format_type=base64, phương thức POST.
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
| `img`         | `https://example.com/image.png` | Url ảnh mặt trước hoặc mặt sau của đăng ký xe               |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

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
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

**Body**:

| Key   | Type   | Value         | Mô tả                                              |
| ----- | ------ | ------------- | -------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh của mặt trước hoặc mặt sau của đăng ký xe |

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
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng ký xe đã được cắt và căn chỉnh              |

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

Phản hồi chung sẽ là một JSON với định dạng sau:

```python
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
  "invalidCode": [xxxx],
  "type": [xxxx]
}

```

Chú ý: Trường hợp trích xuất thông tin từ đăng ký xe không có trường valid, invalidCode, invalidMessage.

Mặt trước đăng ký xe - `vehicle_registration_front`

- `name` : Tên chủ sở hữu xe.
- `name_confidence` : Độ tin cậy tên chủ sở hữu xe.
- `address` : Nơi cư trú.
- `address_confidence` : Độ tin cậy nơi cư trú
- `id` : Id đăng ký xe.
- `id_confidence` : Độ tin cậy id đăng ký xe.
- `plate` : Biển số xe.
- `plate_confidence` : Độ tin cậy biển số xe.
- `issued_at` : Nơi cấp.
- `issued_at_confidence` : Độ tin cậy nơi cấp.
- `image` : Ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe - `vehicle_registration_back`

- `name` : Tên chủ sở hữu xe.
- `name_confidence` : Độ tin cậy tên chủ sở hữu xe.
- `address` : Nơi cư trú.
- `address_confidence` : Độ tin cậy nơi cư trú.
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `Address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `Address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `Address_district` : Quận/huyện trong địa chỉ thường trú.
- `Address_ward` : Phường/xã trong địa chỉ thường trú.
- `engine` : Số máy.
- `engine_confidence` : Độ tin cậy số máy.
- `chassis` : Số khung.
- `chassis_confidence` : Độ tin cậy số khung.
- `brand` : Nhãn hiệu.
- `brand_confidence` : Độ tin cậy nhãn hiệu.
- `model` : Số loại.
- `model_confidence` : Độ tin cậy số loại.
- `color` : Màu sơn.
- `color_confidence` : Độ tin cậy màu sơn.
- `capacity`: Dung tích.
- `capacity_confidence` : Độ tin cậy dung tích.
- `issued_at` : Nơi đăng ký.
- `issued_at_confidence` : Độ tin cậy nơi đăng ký.
- `issued_at_code` : Mã tỉnh nơi đăng ký.
- `last_issue_date` : Ngày đăng ký cuối cùng.
- `last_issue_date_confidence` : Độ tin cậy ngày đăng ký cuối cùng.
- `first_issue_date` : Ngày đăng ký đầu tiên.
- `first_issue_date_confidence` : Độ tin cậy ngày đăng ký đầu tiên.
- `plate` : Biển số xe.
- `plate_confidence` : Độ tin cậy biển số xe.
- `pay_load` : Trọng tải.
- `pay_load_confidence` : Độ tin cậy trọng tải.
- `year_of_manufacture` : Năm sản xuất.
- `year_of_manufacture_confidence` : Độ tin cậy năm sản xuất
- `lie` : Số chỗ nằm.
- `lie_confidence` : Độ tin cậy số chỗ nằm.
- `sit` : Số chỗ ngồi.
- `sit_confidence` : Độ tin cậy số chỗ ngồi.
- `stand` : Số chỗ đứng.
- `stand_confidence` : Độ tin cậy số chỗ đứng.
- `image` : Ảnh mặt sau đăng ký xe.
