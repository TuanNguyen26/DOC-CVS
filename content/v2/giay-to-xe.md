---
title: 'Giấy tờ xe'
metaTitle: 'Giấy tờ xe'
metaDescription: 'This is the api v21 for this page'
stt: 24
---

#### 1. Trích xuất thông tin Giấy tờ xe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                      |
| ------ | -------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Giấy tờ xe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                      | content-type          |
| ------ | -------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Body**:

| Key   | Type   | Value         | Mô tả                            |
| ----- | ------ | ------------- | -------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc pdf của Giấy tờ xe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Giấy tờ xe với đầu vào json

**API**:

| Method | URL                                                      | content-type       |
| ------ | -------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/vehicle?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": array,
  "errorCode": string, // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

Trường `data` là một mảng, mỗi phần tử trong mảng tương ứng với thông tin một trang trong file pdf hoặc một ảnh giấy tờ trích xuất được.

Mỗi phần tử trong mảng sẽ là một JSON với định dạng sau:

```json
{
  "type": string,
  "info": object
}
```

`type`: Loại giấy tờ trong Giấy tờ xe được trích xuất thông tin.

- `vehicle_registration_front`: Mặt trước đăng ký xe.
- `vehicle_registration_back`: Mặt sau đăng ký xe.
- `picertificate`: Đăng kiểm xe.
- `driving_license`: Bằng lái xe.

`info` : Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước đăng ký xe - `vehicle_registration_front`

- `name`: Tên chủ sở hữu xe.
- `name_confidence`: Độ tin cậy tên chủ sở hữu xe.
- `address`: Nơi cư trú.
- `address_confidence`: Độ tin cậy nơi cư trú
- `id`: Id đăng ký xe.
- `id_confidence`: Độ tin cậy id đăng ký xe.
- `plate`: Biển số xe.
- `plate_confidence`: Độ tin cậy biển số xe.
- `issued_at`: Nơi cấp.
- `issued_at_confidence`: Độ tin cậy nơi cấp.
- `image`: Ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe - `vehicle_registration_back`

- `name`: Tên chủ sở hữu xe.
- `name_confidence`: Độ tin cậy tên chủ sở hữu xe.
- `address`: Nơi cư trú.
- `address_confidence`: Độ tin cậy nơi cư trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `Address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `Address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `Address_district`: Quận/huyện trong địa chỉ thường trú.
- `Address_ward`: Phường/xã trong địa chỉ thường trú.
- `engine`: Số máy.
- `engine_confidence`: Độ tin cậy số máy.
- `chassis`: Số khung.
- `chassis_confidence`: Độ tin cậy số khung.
- `brand`: Nhãn hiệu.
- `brand_confidence`: Độ tin cậy nhãn hiệu.
- `model`: Số loại.
- `model_confidence`: Độ tin cậy số loại.
- `color`: Màu sơn.
- `color_confidence`: Độ tin cậy màu sơn.
- `capacity`: Dung tích.
- `capacity_confidence`: Độ tin cậy dung tích.
- `issued_at`: Nơi đăng ký.
- `issued_at_confidence`: Độ tin cậy nơi đăng ký.
- `issued_at_code`: Mã tỉnh nơi đăng ký.
- `last_issue_date`: Ngày đăng ký cuối cùng.
- `last_issue_date_confidence`: Độ tin cậy ngày đăng ký cuối cùng.
- `first_issue_date`: Ngày đăng ký đầu tiên.
- `first_issue_date_confidence`: Độ tin cậy ngày đăng ký đầu tiên.
- `plate`: Biển số xe.
- `plate_confidence`: Độ tin cậy biển số xe.
- `pay_load`: Trọng tải.
- `pay_load_confidence`: Độ tin cậy trọng tải.
- `year_of_manufacture`: Năm sản xuất.
- `year_of_manufacture_confidence`: Độ tin cậy năm sản xuất
- `lie`: Số chỗ nằm.
- `lie_confidence`: Độ tin cậy số chỗ nằm.
- `sit`: Số chỗ ngồi.
- `sit_confidence`: Độ tin cậy số chỗ ngồi.
- `stand`: Số chỗ đứng.
- `stand_confidence`: Độ tin cậy số chỗ đứng.
- `image`: Ảnh mặt sau đăng ký xe.

Đăng kiểm xe - `picertificate`

- `chassis_number`: Số khung.
- `chassis_number_confidence`: Độ tin cậy số khung.
- `commercial_use`: Kinh doanh vận tải.
- `commercial_use_confidence`: Độ tin cậy kinh doanh vận tải.
- `design_pay_load`: Khối lượng hàng.
- `design_pay_load_confidence`: Độ tin cậy khối lượng hàng.
- `design_towed_mass`: Khối lượng kéo theo.
- `design_towed_mass_confidence`: Độ tin cậy khối lượng kéo theo.
- `engine_number`: Số máy.
- `engine_number_confidence`: Độ tin cậy số máy.
- `inside_cargo_container_dimension`: Kích thước thùng hàng.
- `inside_cargo_container_dimension_confidence`: Độ tin cậy kích thước thùng hàng.
- `issued_on`: Đơn vị kiểm định.
- `issued_on_confidence`: Độ tin cậy đơn vị kiểm định.
- `issued_on_code`: Mã code tỉnh đơn vị kiểm định.
- `life_time_limit`: Niên hạn sử dụng.
- `life_time_limit_confidence`: Độ tin cậy niên hạn sử dụng.
- `manufactured_country`: Quốc gia sản xuất.
- `manufactured_country_confidence`: Độ tin cậy quốc gia sản xuất.
- `manufactured_year`: Năm sản xuất.
- `manufactured_year_confidence`: Độ tin cậy năm sản xuất.
- `mark`: Nhãn hiệu.
- `mark_confidence`: Độ tin cậy nhãn hiệu.
- `model_code`: Số loại.
- `model_code_confidence`: Độ tin cậy số loại.
- `modification`: Cải tạo.
- `modification_confidence`: Độ tin cậy cải tạo.
- `permissible_no`: Số người cho phép chở.
- `permissible_no_confidence`: Độ tin cậy số người cho phép chở.
- `regis_date`: Ngày đăng ký.
- `regis_date_confidence`: Độ tin cậy ngày đăng ký.
- `registration_number`: Biển đăng ký.
- `registration_number_confidence`: Độ tin cậy biển đăng ký.
- `seri`: Số sê-ri.
- `seri_confidence`: Độ tin cậy số sê-ri.
- `tire_size`: Cỡ lốp là một list mỗi list là một dòng trên đăng kiểm.
- `tire_size_confidence`: Độ tin cậy cỡ lốp.
- `type`: Loại phương tiện.
- `type_confidence`: Độ tin cậy loại phương tiện.
- `valid_until`: Có hiệu lực đến hết ngày.
- `valid_until_confidence`: Độ tin cậy có hiệu lực đến hết ngày.
- `wheel_form`: Công thức bánh.
- `wheel_form_confidence`: Độ tin cậy công thức bánh.
- `capacity`: Dung tích.
- `capacity_confidence`: Độ tin cậy dung tích.
- `report_number`: Số phiếu.
- `report_number_confidence`: Độ tin cậy số phiếu.
- `authorized_pay_load`: Khối lượng hàng cấp phép.
- `authorized_pay_load_confidence`: Độ tin cậy khối lượng hàng cấp phép.
- `lying_place`: Số chỗ nằm.
- `lying_place_confidence`: Độ tin cậy Số chỗ nằm.
- `seat_place`: Số chỗ ngồi.
- `seat_place_confidence`: Độ tin cậy Số chỗ ngồi.
- `stand_place`: Số chỗ đứng.
- `stand_place_confidence`: Độ tin cậy Số chỗ đứng.
- `image`: Ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.

Bằng lái xe - `driving_license`

- `id`: Số thẻ.
- `name`: Họ và tên.
- `dob`: Ngày sinh.
- `class`: Hạng.
- `nationality`: Quốc tịch.
- `issue_date`: Ngày phát hành.
- `due_date`: Ngày hết hạn.
- `address`: Nơi cư trú.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `id_confidence`: Độ tin cậy thông tin trích xuất số thẻ.
- `name_confidence`: Độ tin cậy thông tin trích xuất họ và tên.
- `dob_confidence`: Độ tin cậy thông tin trích xuất ngày sinh.
- `class_confidence`: Độ tin cậy thông tin trích xuất hạng.
- `nationality_confidence`: Độ tin cậy thông tin trích xuất quốc tịch.
- `issue_date_confidence`: Độ tin cậy thông tin trích xuất ngày phát hành.
- `due_date_confidence`: Độ tin cậy thông tin trích xuất ngày hết hạn.
- `address_confidence`: Độ tin cậy thông tin trích xuất nơi cư trú.
- `id_box`: Box trường Số thẻ format [xmin, ymin, xmax, ymax].
- `name_box`: Box trường Họ và tên format [xmin, ymin, xmax, ymax].
- `dob_box`: Box trường Ngày sinh format [xmin, ymin, xmax, ymax].
- `class_box`: Box trường Hạng format [xmin, ymin, xmax, ymax].
- `nationality_box`: Box trường Quốc tịch format [xmin, ymin, xmax, ymax].
- `issue_date_box`: Box trường Ngày phát hành format [xmin, ymin, xmax, ymax].
- `due_date_box`: Box trường Ngày hết hạn format [xmin, ymin, xmax, ymax].
- `address_box`: Box trường Nơi cư trú format [xmin, ymin, xmax, ymax].
- `image`: Ảnh đã cắt ra và căn chỉnh của bằng lái xe.

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |
