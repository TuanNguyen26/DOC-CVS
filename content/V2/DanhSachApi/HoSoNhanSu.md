---
title: 'Hồ sơ nhân sự'
metaTitle: 'Hồ sơ nhân sự'
metaDescription: 'This is the api v2 for this page'
id: 10
---

#### 1. Trích xuất thông tin Hồ sơ nhân sự với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Hồ sơ nhân sự với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Body**:

| Key   | Type | Value         | Mô tả                               |
| ----- | ---- | ------------- | ----------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Hồ sơ nhân sự |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Hồ sơ nhân sự với đầu vào json

**API**:

| Method | URL                                                               | content-type       |
| ------ | ----------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/employee_profile?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": {
    "id_card": array,
    "registration_book": array,
    "curriculum_vitae": array,
    "academic_degree": array,
    "birth_certificate": array,
    "health_certification": array,
    "image_negative": array
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Đối với các keys `id_card`,`academic_degree`,`birth_certificate` thì value là mảng có một hoặc nhiều phần tử.

Đối với các keys `registration_book`,`curriculum_vitae` thì value là mảng có duy nhất một phần tử.

Đối với `image_negative` là mảng ảnh không trích xuất được bất cứ thông tin của một loại giấy tờ nào (ảnh định dạng base64).

Mỗi phần tử trong mảng sẽ là một JSON với định dạng sau:

```json
{
  "type": string,
  "info": object
}
```

Thẻ, giấy tờ tùy thân:

- `type`: `id_card`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `dob`: Ngày sinh
  - `gender`: Giới tính
  - `address`: Địa chỉ
  - `hometown`: Quê quán
  - `id`: Số thẻ
  - `issue_date`: Ngày cấp
  - `issued_at`: Nơi cấp
  - `image_front`: Ảnh giấy tờ tùy thân mặt trước dạng base64
  - `image_back`: Ảnh giấy tờ tùy thân mặt sau dạng base64

Sơ yếu lý lịch:

- `type`: `curriculum_vitae`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `name_id`: Trang đi kèm với họ tên được trích xuất
  - `dob`: Ngày sinh
  - `dob_id`: Trang đi kèm với ngày sinh được trích xuất
  - `work_experience`: Kinh nghiệm làm việc
  - `work_experience_id`: Trang đi kèm với kinh nghiệm làm việc
  - `father_name`: Họ tên bố
  - `father_name_id`: Trang đi kèm với họ tên bố
  - `mother_name`: Họ tên mẹ
  - `mother_name_id`: Trang đi kèm với họ tên mẹ
  - `academic_level`: Trình độ học vấn
  - `academic_level_id`: Trang đi kèm trình độ học vấn.
  - `image_0`: Ảnh trang đầu của sơ yếu lý lịch
  - `image_1`: Ảnh trang thứ 2 của sơ yếu lý lịch
  - `image_2`: Ảnh trang thứ 3 của sơ yếu lý lịch
  - `image_3`: Ảnh trang thứ 4 của sơ yếu lý lịch

Sổ hộ khẩu:

- `type`: `registration_book`.
- `info_goods`: là json chứa các thông tin:
  - `book_number`: Số sổ hộ khẩu
  - `address`: Địa chỉ
  - `head_name`: Họ tên chủ hộ
  - `image`: Ảnh trang bìa sổ hộ khẩu
  - `member`: Là một json chứa thông tin của các thành viên gồm:
    - `relationship_to_head`: Mối quan hệ với chủ hộ
    - `name`: Họ tên thành viên
    - `dob`: Ngày sinh thành viên
    - `id_card`: Số chứng minh thư/Hộ chiếu thành viên
    - `image_member`: Ảnh trang chứa thông tin thành viên

Bằng đại học:

- `type`: `academic_degree`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ tên
  - `dob`: Ngày sinh
  - `school`: Trường học
  - `major`: Ngành học
  - `graduation_year`: Năm tốt nghiệp
  - `award_classification`: Xếp loại
  - `academic_level`: Trình độ
  - `image`: Ảnh của bằng đại học

Giấy khai sinh:

- `type`: `birth_certificate`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ và Tên
  - `dob`: Ngày sinh
  - `regis_place`: Nơi Đăng ký
  - `number`: Số
  - `number_book`: Số quyển
  - `father_name`: Họ và Tên Bố
  - `father_dob`: Ngày sinh Bố
  - `father_address`: Nơi cư trú của Bố
  - `mother_name`: Họ và Tên Mẹ
  - `mother_dob`: Ngày sinh Mẹ
  - `mother_address`: Nơi cư trú của Mẹ
  - `place_of_birth`: Nơi sinh
  - `image`: Ảnh của giấy khai sinh

Giấy khám sức khỏe:

- `type`: `health_certification`.
- `info_goods`: là json chứa các thông tin:
  - `name`: Họ và Tên
  - `dob`: Ngày sinh
  - `height`: Chiều cao
  - `weight`: Cân nặng
  - `health_condition`: Điều kiện sức khoẻ
  - `image_0`: Ảnh trang đầu của giấy khám sức khoẻ
  - `image_1`: Ảnh trang chứa thông tin chiều cao cân nặng
  - `image_2`: Ảnh trang thứ 3 ảnh chứa thông tin điều kiện sức khoẻ

Lưu ý: các trường thông tin (trừ trường image) sẽ có `_box` và `_confidence` đi kèm

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
