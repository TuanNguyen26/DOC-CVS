---
title: 'Hồ sơ nhân sự'
metaTitle: 'Hồ sơ nhân sự'
metaDescription: 'This is the api v2 for this page'
stt: 21
---

#### 1. Trích xuất thông tin Hồ sơ nhân sự với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/employee_profile` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

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
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

**Body**:

| Key   | Type   | Value         | Mô tả                               |
| ----- | ------ | ------------- | ----------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc pdf của Hồ sơ nhân sự |

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
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Hồ sơ nhân sự đã được căn chỉnh              |

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

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
"data": [xxxx],
"errorCode": string, // mã lỗi
"errorMessage": string // thông báo lỗi
}
```

Trong đó trường data là 1 json có định dạng như sau:

```json
{
	“id_card”: [xxx]
	“registration_book”: [xxx]
	“curriculum_vitae”: [xxx]
	“academic_degree”: [xxx]
	“birth_certificate”: [xxx]
	“health_certification”: [xxx]
	“confirm_residence”: [xxx]
	“image_negative”: [xxx]
	“id_negative": [xxx]
}
```

Chi tiết các trường được mô tả dưới đây:

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

Đối với giấy tờ tùy thân thì tương ứng với trường id_card trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một giấy tờ tùy thân trích xuất được (một giấy tờ tùy thân có thể gồm cả mặt trước và mặt sau). Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “id_card” - Thể hiện loại giấy tờ này là giấy tờ tùy thân
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `address` : Địa chỉ
- `address_box` : Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence` : Độ tin cậy địa chỉ
- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy ngày sinh
- `gender` : Giới tính
- `gender_box` : Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy giới tính
- `hometown` : Quê quán
- `hometown_box` : Tọa độ quê quán là một list gồm [left, top, right, bottom]
- `hometown_confidence` : Độ tin cậy quê quán
- `id` : Số thẻ
- `id_box` : Tọa độ số thẻ là một list gồm [left, top, right, bottom]
- `id_confidence` : Độ tin cậy số thẻ
- `image_front` : Ảnh giấy tờ tùy thân mặt trước, định dạng base64
- `image_back` : Ảnh giấy tờ tùy thân mặt sau, định dạng base64
- `issue_date` : Ngày cấp
- `issue_date_box` : Tọa độ ngày cấp là một list gồm [left, top, right, bottom]
- `issue_date_confidence` : Độ tin cậy ngày cấp
- `issued_at` : Nơi cấp
- `issued_at_box`: Tọa độ nơi cấp là một list gồm [left, top, right, bottom]
- `issued_at_confidence` : Độ tin cậy nơi cấp
- `name` : Họ tên
- `name_box` : Tọa độ họ tên là một list gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy họ tên

Sơ yếu lý lịch:

Đối với sơ yếu lý lịch thì tương ứng với trường curriculum_vitae trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một sơ yếu lý lịch trích xuất được (một sơ yếu lý lịch có thể gồm nhiều trang). Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “curriculum_vitae” - Thể hiện loại giấy tờ này là sơ yếu lý lịch
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `academic_level` : Trình độ học vấn
- `academic_level_box` : Tọa độ trình độ học vấn là một list gồm [left, top, right, bottom]
- `academic_level_confidence` : Độ tin cậy trình độ học vấn
- `academic_level_id` : Thể hiện trình độ học vấn ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `current_address` : Nơi ở hiện tại
- `current_address_box` : Tọa độ nơi ở hiện tại là một list gồm [left, top, right, bottom]
- `current_address_confidence` : Độ tin cậy nơi ở hiện tại
- `current_address_id` : Thể hiện nơi ở hiện tại ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy ngày sinh
- `dob_id` : Thể hiện ngày sinh ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `father_dob` : Ngày sinh bố
- `father_dob_box` : Tọa độ ngày sinh bố là một list gồm [left, top, right, bottom]
- `father_dob_confidence` : Độ tin cậy ngày sinh bố
- `father_dob_id` : Thể hiện ngày sinh bố ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `father_name` : Họ tên bố
- `father_name_box` : Tọa độ họ tên bố là một list gồm [left, top, right, bottom]
- `father_name_confidence` : Độ tin cậy họ tên bố
- `father_name_id` : Thể hiện họ tên bố ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `gender` : Giới tính
- `gender_box` : Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy giới tính
- `gender_id` : Thể hiện giới tính ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `image_0` : Ảnh trang đầu của sơ yếu lý lịch, định dạng base64
- `image_1` : Ảnh trang thứ 2 của sơ yếu lý lịch, định dạng base64
- `image_2` : Ảnh trang thứ 3 của sơ yếu lý lịch, định dạng base64
- `image_3` : Ảnh trang thứ 4 của sơ yếu lý lịch, định dạng base64
- `mother_dob` : Ngày sinh mẹ
- `mother_dob_box` : Tọa độ ngày sinh mẹ là một list gồm [left, top, right, bottom]
- `mother_dob_confidence` : Độ tin cậy ngày sinh mẹ
- `mother_dob_id` : Thể hiện ngày sinh mẹ ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `mother_name` : Họ tên mẹ
- `mother_name_box` : Tọa độ họ tên mẹ là một list gồm [left, top, right, bottom]
- `mother_name_confidence` : Độ tin cậy họ tên mẹ
- `mother_name_id` : Thể hiện họ tên mẹ ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `name` : Họ tên
- `name_box` : Tọa độ họ tên là một list gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy họ tên
- `name_id` : Thể hiện họ tên ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `place_of_birth` : Nơi sinh
- `place_of_birth_box` : Tọa độ nơi sinh là một list gồm [left, top, right, bottom]
- `place_of_birth_confidence` : Độ tin cậy nơi sinh
- `place_of_birth_id` : Thể hiện nơi sinh ở trang thứ bao nhiêu trong sơ yếu lý lịch
- `work_experience` : Kinh nghiệm làm việc
- `work_experience_box` : Tọa độ kinh nghiệm làm việc là một list gồm [left, top, right, bottom]
- `work_experience_confidence` : Độ tin cậy kinh nghiệm làm việc
- `work_experience_id` : Thể hiện kinh nghiệm làm việc ở trang thứ bao nhiêu trong sơ yếu lý lịch

Sổ hộ khẩu:

Đối với sổ hộ khẩu thì tương ứng với trường registration_book trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một sổ hộ khẩu trích xuất được (một sổ hộ khẩu có thể gồm nhiều trang). Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “registration_book” - Thể hiện loại giấy tờ này là sổ hộ khẩu
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `address` : Địa chỉ
- `address_box` : Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence` : Độ tin cậy địa chỉ
- `book_number` : Số sổ hộ khẩu
- `book_number_box` : Tọa độ số sổ hộ khẩu là một list gồm [left, top, right, bottom]
- `book_number_confidence` : Độ tin cậy số sổ hộ khẩu
- `head_name` : Họ tên chủ hộ
- `head_name_box` : Tọa độ họ tên chủ hộ là một list gồm [left, top, right, bottom]
- `head_name_confidence` : Độ tin cậy họ tên chủ hộ
- `image` : Ảnh trang bìa sổ hộ khẩu, định dạng base64
- `member` : Là một list chứa thông tin của các thành viên. Mỗi phần tử trong list là một json có các trường sau:

  - `dob` : Ngày sinh thành viên
  - `dob_box` : Tọa độ ngày sinh thành viên là một list gồm [left, top, right, bottom]
  - `dob_confidence` : Độ tin cậy ngày sinh thành viên
  - `gender` : Giới tính thành viên
  - `gender_box` : Tọa độ giới tính thành viên là một list gồm [left, top, right, bottom]
  - `gender_confidence` : Độ tin cậy giới tính thành viên
  - `id_card` : Số chứng minh nhân dân
  - `id_card_box` : Tọa độ số chứng minh nhân dân là một list gồm [left, top, right, bottom]
  - `id_card_confidence` : Độ tin cậy số chứng minh nhân dân
  - `image_member` : Ảnh trang chứa thông tin của các thành viên, định dạng base64
  - `name` : Họ tên thành viên
  - `name_box` : Tọa độ họ tên thành viên là một list gồm [left, top, right, bottom]
  - `name_confidence` : Độ tin cậy họ tên thành viên
  - `relationship_to_head` : Mối quan hệ với chủ hộ
  - `relationship_to_head_box` : Tọa độ mối quan hệ với chủ hộ là một list gồm [left, top, right, bottom]
  - `relationship_to_head_confidence` : Độ tin cậy mối quan hệ với chủ hộ

Bằng đại học:

Đối với bằng đại học thì tương ứng với trường academic_degree trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một trang bằng đại học trích xuất được. Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “academic_degree” - Thể hiện loại giấy tờ này là bằng đại học
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `academic_level` : Trình độ
- `academic_level_box` : Tọa độ trình độ là một list gồm [left, top, right, bottom]
- `academic_level_confidence` : Độ tin cậy trình độ
- `award_classification` : Xếp loại
- `award_classification_box` : Tọa độ xếp loại là một list gồm [left, top, right, bottom]
- `award_classification_confidence` : Độ tin cậy xếp loại
- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy ngày sinh
- `graduation_year` : Năm tốt nghiệp
- `graduation_year_box` : Tọa độ năm tốt nghiệp là một list gồm [left, top, right, bottom]
- `graduation_year_confidence` : Độ tin cậy năm tốt nghiệp
- `image` : Ảnh bằng tốt nghiệp đã căn chỉnh, định dạng base64
- `major` : Ngành học
- `major_box` : Tọa độ ngành học là một list gồm [left, top, right, bottom]
- `major_confidence` : Độ tin cậy ngành học
- `name` : Họ tên
- `name_box` : Tọa độ họ tên là một list gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy họ tên
- `school` : Trường học
- `school_box` : Tọa độ trường học là một list gồm [left, top, right, bottom]
- `school_confidence` : Độ tin cậy trường học

Giấy khai sinh:

Đối với giấy khai sinh thì tương ứng với trường `birth_certificate` trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một trang giấy khai sinh trích xuất được. Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “birth_certificate” - Thể hiện loại giấy tờ này là giấy khai sinh
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy của ngày sinh
- `father_address` : Nơi cư trú của bố
- `father_address_box` : Tọa độ nơi cư trú của bố là một list gồm [left, top, right, bottom]
- `father_address_confidence` : Độ tin cậy nơi cư trú của bố
- `father_dob` : Ngày sinh của bố
- `father_dob_box` : Tọa độ ngày sinh của bố là một list gồm [left, top, right, bottom]
- `father_dob_confidence` : Độ tin cậy ngày sinh của bố
- `father_name` : Họ và tên bố
- `father_name_box` : Tọa độ họ và tên bố là một list gồm [left, top, right, bottom]
- `father_name_confidence` : Độ tin cậy họ và tên bố
- `gender` : Giới tính
- `gender_box` : Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy của giới tính
- `image` : Ảnh của giấy khai sinh đã căn chỉnh, định dạng base64
- `mother_address` : Nơi cư trú của mẹ
- `mother_address_box` : Tọa độ nơi cư trú của mẹ là một list gồm [left, top, right, bottom]
- `mother_address_confidence` : Độ tin cậy nơi cư trú của mẹ
- `mother_dob` : Ngày sinh của mẹ
- `mother_dob_box` : Tọa độ ngày sinh của mẹ là một list gồm [left, top, right, bottom]
- `mother_dob_confidence` : Độ tin cậy ngày sinh của mẹ
- `mother_name` : Họ và tên mẹ
- `mother_name_box` : Tọa độ họ và tên mẹ là một list gồm [left, top, right, bottom]
- `mother_name_confidence` : Độ tin cậy họ và tên mẹ
- `number` : Số
- `number_box` : Tọa độ số là một list gồm [left, top, right, bottom]
- `number_confidence` : Độ tin cậy của số
- `number_book` : Số quyển
- `number_book_box` : Tọa độ số quyển là một list gồm [left, top, right, bottom]
- `number_book_confidence` : Độ tin cậy của số quyển
- `place_of_birth` : Nơi sinh
- `place_of_birth_box` : Tọa độ nơi sinh là một list gồm [left, top, right, bottom]
- `place_of_birth_confidence` : Độ tin cậy của nơi sinh
- `regis_place` : Nơi đăng ký
- `regis_place_box` : Tọa độ nơi đăng ký là một list gồm [left, top, right, bottom]
- `regis_place_confidence` : Độ tin cậy của nơi đăng ký

Giấy xác nhận thông tin cư trú:

Đối với giấy xác nhận thông tin cư trú thì tương ứng với trường confirm_residence trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một trang giấy xác nhận thông tin cư trú trích xuất được. Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “confirm_residence” - Thể hiện loại giấy tờ này là giấy xác nhận cư trú
	“info": [xxx]
}
```

Trường thông tin info là một json có các trường sau:

- `address` : Thường trú
- `address_box` : Tọa độ thường trú là một list gồm [left, top, right, bottom]
- `address_confidence` : Độ tin cậy thường trú
- `current_address` : Nơi ở hiện tại
- `current_address_box` : Tọa độ nơi ở hiện tại là một list gồm [left, top, right, bottom]
- `current_address_confidence` : Độ tin cậy nơi ở hiện tại
- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy ngày sinh
- `ethnicity` : Dân tộc
- `ethnicity_box` : Tọa độ dân tộc là một list gồm [left, top, right, bottom]
- `ethnicity_confidence` : Độ tin cậy dân tộc
- `gender` : Giới tính
- `gender_box` : Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy của giới tính
- `head_id` : Số định danh chủ hộ
- `head_id_box` : Tọa độ số định danh chủ hộ là một list gồm [left, top, right, bottom]
- `head_id_confidence` : Độ tin cậy của số định danh chủ hộ
- `head_name` : Tên chủ hộ
- `head_name_box` : Tọa độ tên chủ hộ là một list gồm [left, top, right, bottom]
- `head_name_confidence` : Độ tin cậy của tên chủ hộ
- `hometown` : Quê quán
- `hometown_box` : Tọa độ quê quán là một list gồm [left, top, right, bottom]
- `hometown_confidence` : Độ tin cậy của quê quán
- `id` : Số định danh
- `id_box` : Tọa độ số định danh là một list gồm [left, top, right, bottom]
- `id_confidence` : Độ tin cậy của số định danh
- `image` : Ảnh giấy xác nhận thông tin cư trú đã căn chỉnh, định dạng base64
- `image_member` : Ảnh bảng các thành viên, định dạng base64
- `member` : Là một list chứa thông tin của các thành viên. Mỗi phần tử trong list là một json có các trường sau:

  - `relationship_to_head` : Quan hệ với chủ hộ
  - `relationship_to_head_box` : Tọa độ quan hệ với chủ hộ là một list gồm [left, top, right, bottom]
  - `relationship_to_head_confidence` : Độ tin cậy quan hệ với chủ hộ
  - `name` : Họ và tên người thân
  - `name_box` : Tọa độ họ và tên người thân là một list gồm [left, top, right, bottom]
  - `name_confidence` : Độ tin cậy họ và tên người thân
  - `dob` : Ngày sinh người thân
  - `dob_box` : Tọa độ ngày sinh người thân là một list gồm [left, top, right, bottom]
  - `dob_confidence` : Độ tin cậy ngày sinh người thân
  - `gender` : Giới tính người thân
  - `gender_box` : Tọa độ giới tính người thân là một list gồm [left, top, right, bottom]
  - `gender_confidence` : Độ tin cậy giới tính người thân
  - `id_card` : Số định danh người thân
  - `id_card_box` : Tọa độ số định danh người thân là một list gồm [left, top, right, bottom]
  - `id_card_confidence` : Độ tin cậy số định danh người thân

- `name` : Họ và tên
- `name_box` : Tọa độ họ và tên là một list gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy họ và tên
- `nationality` : Quốc tịch
- `nationality_box` : Tọa độ quốc tịch là một list gồm [left, top, right, bottom]
- `nationality_confidence` : Độ tin cậy quốc tịch
- `registered_address` : Tạm trú
- `registered_address_box` : Tọa độ tạm trú là một list gồm [left, top, right, bottom]
- `registered_address_confidence` : Độ tin cậy tạm trú
- `relationship_to_head` : Quan hệ với chủ hộ
- `relationship_to_head_box` : Tọa độ quan hệ với chủ hộ là một list gồm [left, top, right, bottom]
- `relationship_to_head_confidence` : Độ tin cậy quan hệ với chủ hộ
- `religious` : Tôn giáo
- `religious_box` : Tọa độ tôn giáo là một list gồm [left, top, right, bottom]
- `religious_confidence` : Độ tin cậy tôn giáo

Giấy khám sức khỏe:

Đối với giấy khám sức khỏe thì tương ứng với trường health_certification trong data. Trả ra là một list, mỗi phần tử trong list tương ứng với một giấy khám sức khỏe trích xuất được (một giấy khám sức khỏe có nhiều trang). Mỗi phần tử này là một json có định dạng như sau:

```json
{
	“type": “health_certification” - Thể hiện loại giấy tờ này là giấy khám sức khỏe
	“info": [xxx]
}

```

Trường thông tin info là một json có các trường sau:

- `name` : Họ và tên
- `name_box` : Tọa độ họ và tên là một list gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy họ và tên
- `name_id` : Thể hiện họ và tên ở trang thứ bao nhiêu trong giấy khám
- `dob` : Ngày sinh
- `dob_box` : Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy ngày sinh
- `dob_id` : Thể hiện ngày sinh ở trang thứ bao nhiêu rong giấy khám
- `health_condition` : Điều kiện sức khỏe
- `health_condition_box` : Tọa độ điều kiện sức khỏe là một list gồm [left, top, right, bottom]
- `health_condition_confidence` : Độ tin cậy điều kiện sức khỏe
- `health_condition_id` : Thể hiện điều kiện sức khỏe ở trang thứ bao nhiêu trong giấy khám
- `height` : Chiều cao
- `height_box` : Tọa độ chiều cao là một list gồm [left, top, right, bottom]
- `height_confidence` : Độ tin cậy chiều cao
- `height_id` : Thể hiện chiều cao ở trang thứ bao nhiêu trong giấy khám
- `weight` : Cân nặng
- `weight_box` : Tọa độ cân nặng là một list gồm [left, top, right, bottom]
- `weight_confidence` : Độ tin cậy cân nặng
- `weight_id` : Thể hiện cân nặng ở trang thứ bao nhiêu trong giấy khám
- `image_0` : Ảnh trang đầu của giấy khám sức khỏe, định dạng base64
- `image_1` : Ảnh trang chứa thông tin chiều cao cân nặng, định dạng base64
- `image_2` : Ảnh trang chứa thông tin điều kiện sức khoẻ, định dạng base64

Những trang không trích xuất được thông tin

Đối với những trang không trích xuất được thông tin tương ứng với 2 trường là image_negative và id_negative trong data. Trong đó:

- `image_negative` : Là một list ảnh định dạng base64 của những trang không trích xuất được thông tin
- `id_negative` : Là một list index thể hiện trang không trích xuất được thông tin là trang thứ bao nhiêu trong bộ hồ sơ

Lưu ý: các trường thông tin (trừ trường image) sẽ có `_box` và `_confidence` đi kèm

Bảng mã lỗi:

| Mã lỗi | Message                           | Mô tả                           |
| ------ | --------------------------------- | ------------------------------- |
| 0      | Success                           | Thành công                      |
| 1      | Incorrect image format            | Ảnh bị lỗi                      |
| 2      | Url is unavailable                | Link ảnh bị lỗi                 |
| 3      | Incorrect image format            | Upload ảnh bị lỗi khi dùng POST |
| 4      | Incorrect Api_key or api_secret   | api_key hoặc api_secret sai     |
| 5      | Out of requests                   | Hết số lượng requests hữu dụng  |
| 6      | Error when processing the request | Lỗi khi xử lý request           |
