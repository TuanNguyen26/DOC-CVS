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

Trường hợp trích xuất thông tin từ đăng kiểm xe không có trường valid, invalidCode và trường invalidMessage.

Đăng kiểm xe - `picertificate`

Trả về một danh sách gồm:

- `chassis_number` : Số khung.
- `chassis_number_confidence` : Độ tin cậy số khung.
- `commercial_use` : Kinh doanh vận tải.
- `commercial_use_confidence` : Độ tin cậy kinh doanh vận tải.
- `design_pay_load` : Khối lượng hàng.
- `design_pay_load_confidence` : Độ tin cậy khối lượng hàng.
- `design_towed_mass` : Khối lượng kéo theo.
- `design_towed_mass_confidence` : Độ tin cậy khối lượng kéo theo.
- `engine_number` : Số máy.
- `engine_number_confidence` : Độ tin cậy số máy.
- `inside_cargo_container_dimension` : Kích thước thùng hàng.
- `inside_cargo_container_dimension_confidence` : Độ tin cậy kích thước thùng hàng.
- `issued_on` : Đơn vị kiểm định.
- `issued_on_confidence` : Độ tin cậy đơn vị kiểm định.
- `issued_on_code` : Mã code tỉnh đơn vị kiểm định.
- `life_time_limit` : Niên hạn sử dụng.
- `life_time_limit_confidence` : Độ tin cậy niên hạn sử dụng.
- `manufactured_country` : Quốc gia sản xuất.
- `manufactured_country_confidence` : Độ tin cậy quốc gia sản xuất.
- `manufactured_year` : Năm sản xuất.
- `manufactured_year_confidence` : Độ tin cậy năm sản xuất.
- `mark` : Nhãn hiệu.
- `mark_confidence`: Độ tin cậy nhãn hiệu.
- `model_code` : Số loại.
- `model_code_confidence` : Độ tin cậy số loại.
- `modification` : Cải tạo.
- `modification_confidence` : Độ tin cậy cải tạo.
- `permissible_no` : Số người cho phép chở.
- `permissible_no_confidence` : Độ tin cậy số người cho phép chở.
- `regis_date` : Ngày đăng ký.
- `regis_date_confidence` : Độ tin cậy ngày đăng ký.
- `registration_number` : Biển đăng ký.
- `registration_number_confidence` : Độ tin cậy biển đăng ký.
- `seri` : Số sê-ri.
- `seri_confidence` : Độ tin cậy số sê-ri.
- `tire_size` : Cỡ lốp là một list mỗi list là một dòng trên đăng kiểm.
- `tire_size_confidence` : Độ tin cậy cỡ lốp.
- `type` : Loại phương tiện.
- `type_confidence` : Độ tin cậy loại phương tiện.
- `valid_until` : Có hiệu lực đến hết ngày.
- `valid_until_confidence` : Độ tin cậy có hiệu lực đến hết ngày.
- `wheel_form` : Công thức bánh.
- `wheel_form_confidence` : Độ tin cậy công thức bánh.
- `capacity` : Dung tích.
- `capacity_confidence` : Độ tin cậy dung tích.
- `report_number` : Số phiếu.
- `report_number_confidence` : Độ tin cậy số phiếu.
- `authorized_pay_load` : Khối lượng hàng cấp phép.
- `authorized_pay_load_confidence` : Độ tin cậy khối lượng hàng cấp phép.
- `lying_place` : Số chỗ nằm.
- `lying_place_confidence` : Độ tin cậy Số chỗ nằm.
- `seat_place` : Số chỗ ngồi.
- `seat_place_confidence` : Độ tin cậy Số chỗ ngồi.
- `stand_place` : Số chỗ đứng.
- `stand_place_confidence` : Độ tin cậy Số chỗ đứng.
- `image` : Ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.
