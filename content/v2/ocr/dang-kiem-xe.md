---
title: 'Đăng kiểm xe'
metaTitle: 'Đăng kiểm xe'
stt: 7
---

#### 1. Trích xuất thông tin đăng kiểm xe với đầu vào url ảnh

**API**:

| Method | URL                                                                 |
| ------ | ------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url ảnh đăng kiểm xe                                        |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?img=%s&format_type=%s&get_thumb=%s"
  % (image_url, 'url', 'false'),
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin đăng kiểm xe với đầu vào file ảnh

**API**:

| Method | URL                                                                 | content-type          |
| ------ | ------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

**Body**:

| Key   | Type   | Value         | Mô tả                 |
| ----- | ------ | ------------- | --------------------- |
| `img` | `file` | `example.jpg` | File ảnh đăng kiểm xe |

**Demo Python**:

```python

import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/example.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin đăng kiểm xe với đầu vào json

**API**:

| Method | URL                                                                 | content-type       |
| ------ | ------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh đăng kiểm xe đã được cắt và căn chỉnh            |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle_inspection?format_type=base64&get_thumb=false",
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

Trường hợp trích xuất thông tin từ đăng kiểm xe không có trường valid và trường invalidMessage.

Đăng kiểm xe: Trả về một danh sách gồm

- `chassis_number` : Số khung.
- `commercial_use` : Kinh doanh vận tải.
- `design_pay_load` : Khối lượng hàng.
- `design_towed_mass` : Khối lượng kéo theo.
- `engine_number` : Số máy.
- `inside_cargo_container_dimension` : Kích thước thùng hàng.
- `issued_on` : Đơn vị kiểm định.
- `life_time_limit` : Niên hạn sử dụng.
- `manufactured_country` : Quốc gia sản xuất.
- `manufactured_year` : Năm sản xuất.
- `mark` : Nhãn hiệu.
- `model_code` : Số loại.
- `modification` : Cải tạo.
- `permissible_no` : Số người cho phép chở.
- `regis_date` : Ngày đăng ký.
- `registration_number` : Biển đăng ký.
- `seri` : Số sê-ri.
- `tire_size` : Cỡ lốp.
- `type` : Loại phương tiện.
- `valid_until` : Có hiệu lực đến hết ngày.
- `wheel_form` : Công thức bánh.
- `capacity` : Dung tích.
- `report_number` : Số phiếu.
- `design_pay_load` : Khối lượng hàng thiết kế.
- `authorized_pay_load` : Khối lượng hàng cấp phép.
- `image` : Ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.
