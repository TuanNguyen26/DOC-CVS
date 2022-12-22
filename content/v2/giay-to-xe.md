---
title: 'Giấy tờ xe'
metaTitle: 'Giấy tờ xe'
metaDescription: 'This is the api v21 for this page'
id: 6
---

#### 1. Trích xuất thông tin Giấy tờ xe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                      |
| ------ | -------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/vehicle` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

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
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                            |
| ----- | ---- | ------------- | -------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Giấy tờ xe |

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
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy tờ xe đã được căn chỉnh                 |

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

- `vehicle_registration_front`: Mặt trước đăng ký xe.
- `vehicle_registration_back`: Mặt sau đăng ký xe.
- `picertificate`: Đăng kiểm xe.
- `driving_license`: Bằng lái xe.

`info`: Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `id`: id đăng ký xe.
- `plate`: biển số xe.
- `issued_at`: nơi cấp.
- `image`: ảnh mặt trước đăng ký xe.

Mặt sau đăng ký xe:

- `name`: tên chủ sở hữu xe.
- `address`: nơi cư trú.
- `engine`: số máy.
- `chassis`: số khung.
- `brand`: nhãn hiệu.
- `model`: số loại.
- `color`: màu sơn.
- `capacity`: dung tích.
- `issued_at`: nơi đăng ký.
- `last_issue_date`: ngày đăng ký cuối cùng.
- `first_issue_date`: ngày đăng ký đầu tiên.
- `plate`: biển số xe.
- `image`: ảnh mặt sau đăng ký xe.

Đăng kiểm xe:

- `chassis_number`: số khung.
- `commercial_use`: kinh doanh vận tải.
- `design_pay_load`: khối lượng hàng.
- `design_towed_mass`: khối lượng kéo theo.
- `engine_number`: số máy.
- `inside_cargo_container_dimension`: kích thước thùng hàng.
- `issued_on`: đơn vị kiểm định.
- `life_time_limit`: niên hạn sử dụng.
- `manufactured_country`: quốc gia sản xuất.
- `manufactured_year`: năm sản xuất.
- `mark`: nhãn hiệu.
- `model_code`: số loại.
- `modification`: cải tạo.
- `permissible_no`: số người cho phép chở.
- `regis_date`: ngày đăng ký.
- `registration_number`: biển đăng ký.
- `seri`: số sê-ri.
- `tire_size`: cỡ lốp.
- `type`: loại phương tiện.
- `valid_until`: có hiệu lực đến hết ngày.
- `wheel_form`: công thức bánh.
- `capacity`: dung tích.
- `report_number`: số phiếu.
- `design_pay_load`: khối lượng hàng thiết kế.
- `authorized_pay_load`: khối lượng hàng cấp phép.
- `image`: ảnh đã cắt ra và căn chỉnh của đăng kiểm xe.

Bằng lái xe:

- `id`: số thẻ.
- `name`: họ và tên.
- `dob`: ngày sinh.
- `class`: hạng.
- `nationality`: quốc tịch.
- `issue_date`: ngày phát hành.
- `due_date`: ngày hết hạn.
- `address`: nơi cư trú.
- `image`: ảnh đã cắt ra và căn chỉnh của bằng lái xe.

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
