---
title: 'Hồ sơ claim bảo hiểm sức khỏe'
metaTitle: 'Hồ sơ claim bảo hiểm sức khỏe'
metaDescription: 'This is the api v2 for this page'
stt: 20
---

#### 1. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                     |
| ------ | ------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/claims` |

**Params**:

| Key           | Value                           | Mô tả                                                          |
| ------------- | ------------------------------- | -------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                           |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/claims?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                     | content-type          |
| ------ | ------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/claims` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                          |
| ------------- | -------------- | -------------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

**Body**:

| Key   | Type   | Value         | Mô tả                                               |
| ----- | ------ | ------------- | --------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc pdf của Hồ sơ claim bảo hiểm sức khỏe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/claims?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào json

**API**:

| Method | URL                                                     | content-type       |
| ------ | ------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/claims` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                          |
| ------------- | -------------- | -------------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`    |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Hồ sơ claim bảo hiểm sức khỏe đã được căn chỉnh |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/claims?format_type=base64&get_thumb=false",
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

`type` : Loại giấy tờ trong hồ sơ claim bảo hiểm sức khỏe được trích xuất thông tin.

- `9_id_card_front` : Mặt trước của chứng minh nhân dân.
- `12_id_card_front` : Mặt trước thẻ căn cước công dân.
- `chip_id_card_front` : Mặt trước thẻ căn cước công dân gán chip.
- `9_id_card_back` : Mặt sau của chứng minh nhân dân.
- `12_id_card_back` : Mặt sau của thẻ căn cước.
- `chip_id_card_back` : Mặt sau thẻ căn cước công dân gán chip.
- `passport` : Hộ chiếu.
- `bvcard` : Thẻ bên Bảo Việt.
- `claim_form` : Giấy yêu cầu bồi thường.

`info` : Bao gồm các thông tin trích xuất được, với mỗi loại giấy tờ thì sẽ có những thông tin trả về khác nhau.

Mặt trước chứng minh nhân dân:

- `id` : Số chứng minh thư.
- `id_box` : Tọa độ số chứng minh thư là mảng gồm [left, top, right, bottom]
- `id_confidence` : Độ tin cậy số chứng minh thư
- `name` : Họ và tên.
- `name_box` : Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy của họ và tên
- `dob` : Ngày sinh.
- `dob_box` : Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy của ngày sinh
- `hometown` : Quê quán.
- `hometown_box` : Tọa độ quê quán là mảng gồm [left, top, right, bottom].
- `hometown_confidence` : Độ tin cậy của quê quán.
- `address` : Thường trú.
- `address_box` : Tọa độ thường trú là mảng gồm [left, top, right, bottom].
- `address_confidence` : Độ tin cậy của thường trú.
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước thẻ căn cước công dân:

- `id` : Số thẻ.
- `id_box` : Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence` : Độ tin cậy số thẻ
- `name` : Họ và tên.
- `name_box` : Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy của họ và tên
- `dob` : Ngày sinh.
- `dob_box` : Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy của ngày sinh
- `hometown` : Quê quán
- `hometown_box` : Tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence` : Độ tin cậy của quê quán
- `gender` : Giới tính.
- `gender_box` : Tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy của giới tính
- `due_date` : Ngày hết hạn.
- `due_date_box` : Tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence` : Độ tin cậy của ngày hết hạn
- `nationality` : Quốc tịch.
- `nationality_box` : Tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence` : Độ tin cậy của quốc tịch
- `ethnicity` : Dân tộc.
- `ethnicity_box` : Tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence` : Độ tin cậy của dân tộc
- `address` : Thường trú.
- `address_box` : Tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence` : Độ tin cậy của thường trú
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước thẻ căn cước công dân gắn chip:

- `id` : Số thẻ.
- `id_box` : Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence` : Độ tin cậy số thẻ
- `name` : Họ và tên.
- `name_box` : Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy của họ và tên
- `dob` : Ngày sinh.
- `dob_box` : Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy của ngày sinh
- `hometown` : Quê quán
- `hometown_box` : Tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence` : Độ tin cậy của quê quán
- `gender` : Giới tính.
- `gender_box` : Tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy của giới tính
- `due_date` : Ngày hết hạn.
- `due_date_box` : Tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence` : Độ tin cậy của ngày hết hạn
- `nationality` : Quốc tịch.
- `nationality_box` : Tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence` : Độ tin cậy của quốc tịch
- `address` : Thường trú.
- `address_box` : Tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence` : Độ tin cậy của thường trú
- `address_town_code` : Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code` : Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code` : Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code` : Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code` : Mã quận/huyện trong quê quán.
- `hometown_ward_code` : Mã phường/xã trong quê quán.
- `address_town` : Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district` : Quận/huyện trong địa chỉ thường trú.
- `address_ward` : Phường/xã trong địa chỉ thường trú.
- `hometown_town` : Tỉnh/thành phố trong quê quán.
- `hometown_district` : Quận/huyện trong quê quán.
- `hometown_ward` : Phường/xã trong quê quán.
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân:

- `ethnicity` : Dân tộc.
- `ethnicity_box` : Tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence` : Độ tin cậy của dân tộc
- `issue_date` : Ngày cấp.
- `issue_date_box` : Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence` : Độ tin cậy của ngày cấp
- `religious` : Tôn giáo.
- `religious_box` : Tọa độ tôn giáo là mảng gồm [left, top, right, bottom]
- `religious_confidence` : Độ tin cậy của tôn giáo
- `issued_at` : Nơi cấp
- `issued_at_box` : Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence` : Độ tin cậy của nơi cấp
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân:

- `issue_date` : Ngày cấp.
- `issue_date_box` : Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence` : Độ tin cậy của ngày cấp
- `issued_at` : Nơi cấp
- `issued_at_box` : Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence` : Độ tin cậy của nơi cấp
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân gán chip:

- `issue_date` : Ngày cấp.
- `issue_date_confidence` : Độ tin cậy của ngày cấp
- `issue_date_box` : Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issued_at` : Nơi cấp
- `issued_at_confidence` : Độ tin cậy của nơi cấp
- `issued_at_box` : Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `country` : Quốc gia
- `document_number` : Id mặt sau
- `person_number` : Id mặt trước
- `dob` : Ngày sinh
- `gender` : Giới tính
- `due_date` : Ngày hết hạn
- `nationality` : Quốc tịch
- `sur_name` : Họ
- `given_name` : Tên
- `image` : Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `mrz_confidence` : Độ tin cậy của mrz code

Passport:

- `id` : Passport id
- `sur_name` : Họ
- `given_name`: Tên
- `dob` : Ngày sinh
- `gender` : Giới tính
- `country` : Quốc gia
- `nationality` : Quốc tịch
- `due_date` : Ngày hết hạn
- `person_number` : Mã số công dân,
- `image` : Ảnh passport đã được cắt và căn chỉnh
- `confidence` : Độ tin cậy của mrz code

Thẻ bên Bảo Việt:

- `name` : Họ tên
- `name_box` : Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence` : Độ tin cậy của họ tên
- `plan` : Chương trình
- `plan_box` : Tọa độ chương trình là mảng gồm [left, top, right, bottom]
- `plan_confidence` : Độ tin cậy chương trình
- `company` : Công ty
- `company_box` : Tọa độ công ty là mảng gồm [left, top, right, bottom]
- `company_confidence` : Độ tin cậy công ty
- `valid` : Hiệu lực
- `valid_box` : Tọa độ hiệu lực là mảng gồm [left, top, right, bottom]
- `valid_confidence` : Độ tin cậy hiệu lực
- `policy_no` : Số thẻ
- `policy_no_box` : Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `policy_no_confidence` : Độ tin cậy số thẻ
- `image` : Ảnh thẻ đã cắt và căn chỉnh

Giấy yêu cầu bồi thường:

- `insure_name` : Họ tên người được bảo hiểm
- `insure_name_box` : Tọa độ của họ tên người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `insure_name_confidence` : Độ tin cậy của họ tên người được bảo hiểm
- `dob` : Ngày sinh người được bảo hiểm
- `dob_box` : Tọa độ của ngày sinh người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `dob_confidence` : Độ tin cậy của ngày sinh người được bảo hiểm
- `gender` : Giới tính người được bảo hiểm
- `gender_box` : Tọa độ của giới tính người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `gender_confidence` : Độ tin cậy của giới tính người được bảo hiểm
- `certificate_no` : Số thẻ bảo hiểm của người được bảo hiểm
- `certificate_no_box` : Tọa độ của số thẻ bảo hiểm người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `certificate_no_confidence` : Độ tin cậy của số thẻ bảo hiểm người được bảo hiểm
- `id_card_no` : Số CMND người được bảo hiểm
- `id_card_no_box` : Tọa độ của số CMND người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `id_card_no_confidence` : Độ tin cậy của số CMND người được bảo hiểm
- `family_member` : Tên người thân của người được bảo hiểm
- `family_member_box` : Tọa độ của tên người thân người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `family_member_confidence` : Độ tin cậy của tên người thân người được bảo hiểm
- `policy_holder` : Tên bên mua bảo hiểm
- `policy_holder_box` : Tọa độ của tên bên mua bảo hiểm là mảng gồm [left, top, right, bottom]
- `policy_holder_confidence` : Độ tin cậy của tên bên mua bảo hiểm
- `cellphone_no` : Số điện thoại người được bảo hiểm
- `cellphone_no_box` : Tọa độ của số điện thoại người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `cellphone_no_confidence` : Độ tin cậy của số điện thoại người được bảo hiểm
- `email` : Email người được bảo hiểm
- `email_box` : Tọa độ của email người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `email_confidence` : Độ tin cậy của email người được bảo hiểm
- `image` : Ảnh của giấy yêu cầu đã được cắt và căn chỉnh

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
