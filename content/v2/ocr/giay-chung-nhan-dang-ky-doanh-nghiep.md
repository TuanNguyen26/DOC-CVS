---
title: 'Giấy chứng nhận đăng kí doanh nghiệp'
metaTitle: 'Giấy chứng nhận đăng kí doanh nghiệp'
stt: 12
---

#### 1. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                             |
| ------ | ------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` |

**Params**:

| Key           | Value                           | Mô tả                                                                         |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                                          |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                             | content-type          |
| ------ | ------------------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                                         |
| ------------- | -------------- | ----------------------------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Body**:

| Key   | Type   | Value         | Mô tả                                                                                    |
| ----- | ------ | ------------- | ---------------------------------------------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc file pdf của Giấy chứng nhận đăng ký doanh nghiệp cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào json

**API**:

| Method | URL                                                                             | content-type       |
| ------ | ------------------------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                                         |
| ------------- | -------------- | ----------------------------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "data": [xxxx],
  "errorCode": string, // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

Trong trường hợp nhận dạng 1 giấy tờ tùy thân bất kì, trường `data` sẽ có gồm các thông tin sau:

```json
{
  "info": [xxxx],
  "valid": [xxxx],
  "invalidMessage": [xxxx],
  "type": [xxxx]
}
```

Giấy chứng nhận đăng ký doanh nghiệp - `business_registration`

- `company_name`: Tên doanh nghiệp
- `english_name`: Tên nước ngoài
- `short_name`: Tên viết tắt
- `business_code`: Mã số doanh nghiệp
- `regis_date`: Ngày đăng ký
- `date_of_change`: Ngày thay đổi
- `address`: Địa chỉ
- `company_phone`: Điện thoại
- `fax`: Fax
- `email`: Email
- `website`: Website
- `authorized_capital`: Vốn điều lệ
- `par_value`: Mệnh giá cổ phần
- `total_shares`: Tổng số cổ phần
- `representative_name`: Họ tên người đại diện
- `representative_title`: Chức danh người đại diện
- `gender`: Giới tính
- `dob`: Ngày sinh
- `ethnicity`: Dân tộc
- `nationality`: Quốc tịch
- `document_type`: Loại giấy tờ
- `number_of_idcard`: Số cmt
- `issue_date`: Ngày cấp
- `issued_at`: Nơi cấp
- `household_address`: Địa chỉ hộ khẩu
- `representative_address`: Nơi ở hiện tại
- `company_name_box`: Tọa độ tên doanh nghiệp là một list gồm [left, top, right, bottom]
- `english_name_box`: Tọa độ tên nước ngoài là một list gồm [left, top, right, bottom]
- `short_name_box`: Tọa độ tên viết tắt là một list gồm [left, top, right, bottom]
- `business_code_box`: Tọa độ mã số doanh nghiệp là một list gồm [left, top, right, bottom]
- `regis_date_box`: Tọa độ ngày đăng ký là một list gồm [left, top, right, bottom]
- `date_of_change_box`: Tọa độ ngày thay đổi là một list gồm [left, top, right, bottom]
- `address_box`: Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `company_phone_box`: Tọa độ điện thoại là một list gồm [left, top, right, bottom]
- `fax_box`: Tọa độ fax là một list gồm [left, top, right, bottom]
- `email_box`: Tọa độ email là một list gồm [left, top, right, bottom]
- `website_box`: Tọa độ website là một list gồm [left, top, right, bottom]
- `authorized_capital_box`: Tọa độ vốn điều lệ là một list gồm [left, top, right, bottom]
- `par_value_box`: Tọa độ mệnh giá cổ phần là một list gồm [left, top, right, bottom]
- `total_shares_box`: Tọa độ tổng số cổ phần là một list gồm [left, top, right, bottom]
- `representative_name_box`: Tọa độ họ tên người đại diện là một list gồm [left, top, right, bottom]
- `representative_title_box`: Tọa độ chức danh người đại diện là một list gồm [left, top, right, bottom]
- `gender_box`: Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `dob_box`: Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `ethnicity_box`: Tọa độ dân tộc là một list gồm [left, top, right, bottom]
- `nationality_box`: Tọa độ quốc tịch là một list gồm [left, top, right, bottom]
- `document_type_box`: Tọa độ loại giấy tờ là một list gồm [left, top, right, bottom]
- `number_of_idcard_box`: Tọa độ số cmt là một list gồm [left, top, right, bottom]
- `issue_date_box`: Tọa độ ngày cấp là một list gồm [left, top, right, bottom]
- `issued_at_box`: Tọa độ nơi cấp là một list gồm [left, top, right, bottom]
- `household_address_box`: Tọa độ địa chỉ hộ khẩu là một list gồm [left, top, right, bottom]
- `representative_address_box`: Tọa độ nơi ở hiện tại là một list gồm [left, top, right, bottom]
- `company_name_confidence`: Độ tin cậy tên doanh nghiệp
- `english_name_confidence`: Độ tin cậy tên nước ngoài
- `short_name_confidence`: Độ tin cậy tên viết tắt
- `business_code_confidence`: Độ tin cậy mã số doanh nghiệp
- `regis_date_confidence`: Độ tin cậy ngày đăng ký
- `date_of_change_confidence`: Độ tin cậy ngày thay đổi
- `address_confidence`: Độ tin cậy địa chỉ
- `company_phone_confidence`: Độ tin cậy điện thoại
- `fax_confidence`: Độ tin cậy fax
- `email_confidence`: Độ tin cậy email
- `website_confidence`: Độ tin cậy website
- `authorized_capital_confidence`: Độ tin cậy vốn điều lệ
- `par_value_confidence`: Độ tin cậy mệnh giá cổ phần
- `total_shares_confidence`: Độ tin cậy tổng số cổ phần
- `representative_name_confidence`: Độ tin cậy họ tên người đại diện
- `representative_title_confidence`: Độ tin cậy chức danh người đại diện
- `gender_confidence`: Độ tin cậy giới tính
- `dob_confidence`: Độ tin cậy ngày sinh
- `ethnicity_confidence`: Độ tin cậy dân tộc
- `nationality_confidence`: Độ tin cậy quốc tịch
- `document_type_confidence`: Độ tin cậy loại giấy tờ
- `number_of_idcard_confidence`: Độ tin cậy số cmt
- `issue_date_confidence`: Độ tin cậy ngày cấp
- `issued_at_confidence`: Độ tin cậy nơi cấp
- `household_address_confidence`: Độ tin cậy địa chỉ hộ khẩu
- `representative_address_confidence`: Độ tin cậy nơi ở hiện tại
- `image`: Ảnh giấy đăng ký kinh doanh đã quay và căn chỉnh
