---
title: 'Giấy tờ xe'
metaTitle: 'Giấy tờ xe'
metaDescription: 'This is the api v21 for this page'
stt: 19
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
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
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

- `vehicle_registration_front` : Mặt trước đăng ký xe.
- `vehicle_registration_back` : Mặt sau đăng ký xe.
- `picertificate` : Đăng kiểm xe.
- `driving_license` : Bằng lái xe.

`info` : Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước đăng ký xe:

- `name` : Tên chủ sở hữu xe.
- `address` : Nơi cư trú.
- `id` : Id đăng ký xe.
- `plate` : Biển số xe.
- `issued_at` : Nơi cấp.
- `image` : Ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe:

- `name` : Tên chủ sở hữu xe.
- `address` : Nơi cư trú.
- `engine` : Số máy.
- `chassis` : Số khung.
- `brand` : Nhãn hiệu.
- `model` : Số loại.
- `color` : Màu sơn.
- `capacity` : Dung tích.
- `issued_at` : Nơi đăng ký.
- `last_issue_date` : Ngày đăng ký cuối cùng.
- `first_issue_date` : Ngày đăng ký đầu tiên.
- `plate` : Biển số xe.
- `image` : Ảnh mặt sau đăng ký xe.

Đăng kiểm xe:

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

Bằng lái xe:

- `id` : Số thẻ.
- `name` : Họ và tên.
- `dob` : Ngày sinh.
- `class` : Hạng.
- `nationality` : Quốc tịch.
- `issue_date` : Ngày phát hành.
- `due_date` : Ngày hết hạn.
- `address` : Nơi cư trú.
- `image` : Ảnh đã cắt ra và căn chỉnh của bằng lái xe.

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
