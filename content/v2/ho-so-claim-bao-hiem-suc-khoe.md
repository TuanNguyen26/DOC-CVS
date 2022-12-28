---
title: 'Hồ sơ claim bảo hiểm sức khỏe'
metaTitle: 'Hồ sơ claim bảo hiểm sức khỏe'
metaDescription: 'This is the api v2 for this page'
stt: 17
---

Với đầu vào là file pdf hoặc file ảnh của bộ hồ sơ hoặc của từng loại giấy tờ, các API ở mục 2. sẽ trích xuất thông tin của từng loại giấy tờ. Hiện tại hỗ trợ 18 loại giấy tờ như sau: hóa đơn, giấy ra viện, giấy yêu cầu bồi thường, thẻ Bảo Việt, giấy tờ tùy thân (chứng minh thư nhân dân 9 số mặt trước và mặt sau, căn cước công dân 12 số mặt trước và mặt sau, căn cước công dân gắn chíp mặt trước và mặt sau, hộ chiếu), bảng kê, đơn thuốc, giấy xác nhận bảo lãnh, giấy chứng nhận phẫu thuật, báo cáo ra viện, báo cáo y tế, phiếu chỉ định, phiếu kết quả, tường trình tai nạn, biên lai, phiếu thu, sổ khám bệnh và phiếu khám.

#### 1. Trích xuất thông tin Hồ sơ claim bảo hiểm sức khỏe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                    |
| ------ | ------------------------------------------------------ |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/claims` |

**Params**:

| Key           | Value                           | Mô tả                                                          |
| ------------- | ------------------------------- | -------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Đường dẫn đến ảnh hoặc file pdf của mẫu chứng từ hoặc giấy tờ  |
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
  "data": [xxxx],
  "errorCode": string, // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

Trong trường hợp trích xuất thông tin bộ hồ sơ trường `data` sẽ là 1 list các phần tử:

```json
{
  "info": [xxxx],
  "type": [xxxx],
  "pages": [xxxx]
}

```

`type`: Loại giấy tờ trong hồ sơ claim bảo hiểm sức khỏe được trích xuất thông tin.

- `invoice`: Hóa đơn
- `list_expense`: Bảng kê
- `claim_form`: Giấy yêu cầu bồi thường
- `hospital_discharge_paper`: Giấy ra viện
- `bvcard`: Thẻ bảo việt
- `id_doc`: Giấy tờ tùy thân. Ví dụ chứng minh nhân dân, thẻ căn cước,...
- `prescription`: Đơn thuốc
- `medical_report`: Báo cáo y tế
- `discharge_report`: Báo cáo ra viện
- `bill`: Biên lai
- `surgical_certificate`: Giấy chứng nhận phẫu thuật
- `specify_vote`: Phiếu chỉ định
- `test_results`: Phiếu kết quả
- `medical_examination`: Phiếu khám
- `receipts`: Phiếu thu
- `health_records`: Sổ khám bệnh
- `guarantee_confirmation`: Giấy xác nhận bảo lãnh
- `accident_report`: Tường trình tai nạn
- `9_id_card_front`: Mặt trước của chứng minh nhân dân.
- `12_id_card_front`: Mặt trước thẻ căn cước công dân.
- `chip_id_card_front`: Mặt trước thẻ căn cước công dân gán chip.
- `9_id_card_back`: Mặt sau của chứng minh nhân dân.
- `12_id_card_back`: Mặt sau của thẻ căn cước.
- `chip_id_card_back`: Mặt sau thẻ căn cước công dân gán chip.
- `passport`: Hộ chiếu.
- `bvcard`: Thẻ bên Bảo Việt.

`pages`: Là list chứa index các page của loại giấy tờ

Trong trường hợp trích xuất thông tin 1 loại giấy tờ thì `data` sẽ là 1 item:

```json
{
  "info": [xxxx],
}
```

`info` : Thông tin loại giấy tờ trích xuất được, là một `json` chứa các trường ứng với từng loại giấy tờ được mô tả dưới đây:

Mặt trước chứng minh nhân dân - `9_id_card_front`

- `id`: Số chứng minh nhân dân.
- `id_box`: Tọa độ số chứng minh nhân dân là mảng gồm [left, top, right, bottom]
- `id_confidence`: Độ tin cậy số chứng minh nhân dân
- `name`: Họ và tên.
- `name_box`: Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy của họ và tên
- `dob`: Ngày sinh.
- `dob_box`: Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy của ngày sinh
- `hometown`: Quê quán.
- `hometown_box`: Tọa độ quê quán là mảng gồm [left, top, right, bottom].
- `hometown_confidence`: Độ tin cậy của quê quán.
- `address`: Thường trú.
- `address_box`: Tọa độ thường trú là mảng gồm [left, top, right, bottom].
- `address_confidence`: Độ tin cậy của thường trú.
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước căn cước công dân - `12_id_card_front`

- `id`: Số thẻ.
- `id_box`: Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence`: Độ tin cậy số thẻ
- `name`: Họ và tên.
- `name_box`: Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy của họ và tên
- `dob`: Ngày sinh.
- `dob_box`: Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy của ngày sinh
- `hometown`: Quê quán
- `hometown_box`: Tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence`: Độ tin cậy của quê quán
- `gender`: Giới tính.
- `gender_box`: Tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy của giới tính
- `due_date`: Ngày hết hạn.
- `due_date_box`: Tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence`: Độ tin cậy của ngày hết hạn
- `nationality`: Quốc tịch.
- `nationality_box`: Tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence`: Độ tin cậy của quốc tịch
- `ethnicity`: Dân tộc.
- `ethnicity_box`: Tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence`: Độ tin cậy của dân tộc
- `address`: Thường trú.
- `address_box`: Tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy của thường trú
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt trước căn cước công dân gắn chip - `chip_id_card_front`

- `id`: Số thẻ.
- `id_box`: Tọa độ số thẻ là mảng gồm [left, top, right, bottom]
- `id_confidence`: Độ tin cậy số thẻ
- `name`: Họ và tên.
- `name_box`: Tọa độ họ và tên là mảng gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy của họ và tên
- `dob`: Ngày sinh.
- `dob_box`: Tọa độ ngày sinh là mảng gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy của ngày sinh
- `hometown`: Quê quán
- `hometown_box`: Tọa độ quê quán là mảng gồm [left, top, right, bottom]
- `hometown_confidence`: Độ tin cậy của quê quán
- `gender`: Giới tính.
- `gender_box`: Tọa độ giới tính là mảng gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy của giới tính
- `due_date`: Ngày hết hạn.
- `due_date_box`: Tọa độ ngày hết hạn là mảng gồm [left, top, right, bottom]
- `due_date_confidence`: Độ tin cậy của ngày hết hạn
- `nationality`: Quốc tịch.
- `nationality_box`: Tọa độ quốc tịch là mảng gồm [left, top, right, bottom]
- `nationality_confidence`: Độ tin cậy của quốc tịch
- `address`: Thường trú.
- `address_box`: Tọa độ thường trú là mảng gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy của thường trú
- `address_town_code`: Mã tỉnh/thành phố trong địa chỉ thường trú.
- `address_district_code`: Mã quận/huyện trong địa chỉ thường trú.
- `address_ward_code`: Mã phường/xã trong địa chỉ thường trú.
- `hometown_town_code`: Mã tỉnh/thành phố trong quê quán.
- `hometown_district_code`: Mã quận/huyện trong quê quán.
- `hometown_ward_code`: Mã phường/xã trong quê quán.
- `address_town`: Tỉnh/thành phố trong địa chỉ thường trú.
- `address_district`: Quận/huyện trong địa chỉ thường trú.
- `address_ward`: Phường/xã trong địa chỉ thường trú.
- `hometown_town`: Tỉnh/thành phố trong quê quán.
- `hometown_district`: Quận/huyện trong quê quán.
- `hometown_ward`: Phường/xã trong quê quán.
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau chứng minh nhân dân - `9_id_card_back`

- `ethnicity`: Dân tộc.
- `ethnicity_box`: Tọa độ dân tộc là mảng gồm [left, top, right, bottom]
- `ethnicity_confidence`: Độ tin cậy của dân tộc
- `issue_date`: Ngày cấp.
- `issue_date_box`: Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence`: Độ tin cậy của ngày cấp
- `religious`: Tôn giáo.
- `religious_box`: Tọa độ tôn giáo là mảng gồm [left, top, right, bottom]
- `religious_confidence`: Độ tin cậy của tôn giáo
- `issued_at`: Nơi cấp
- `issued_at_box`: Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence`: Độ tin cậy của nơi cấp
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân - `12_id_card_back`

- `issue_date`: Ngày cấp.
- `issue_date_box`: Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issue_date_confidence`: Độ tin cậy của ngày cấp
- `issued_at`: Nơi cấp
- `issued_at_box`: Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `issued_at_confidence`: Độ tin cậy của nơi cấp
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.

Mặt sau thẻ căn cước công dân gán chip - `chip_id_card_back`

- `issue_date`: Ngày cấp.
- `issue_date_confidence`: Độ tin cậy của ngày cấp
- `issue_date_box`: Tọa độ ngày cấp là mảng gồm [left, top, right, bottom]
- `issued_at`: Nơi cấp
- `issued_at_confidence`: Độ tin cậy của nơi cấp
- `issued_at_box`: Tọa độ nơi cấp là mảng gồm [left, top, right, bottom]
- `country`: Quốc gia
- `document_number`: Id mặt sau
- `person_number`: Id mặt trước
- `dob`: Ngày sinh
- `gender`: Giới tính
- `due_date`: Ngày hết hạn
- `nationality`: Quốc tịch
- `sur_name`: Họ
- `given_name`: Tên
- `image`: Ảnh đã cắt ra và căn chỉnh của giấy tờ.
- `mrz_confidence`: Độ tin cậy của mrz code

Passport - `Hộ chiếu`

- `id`: Passport id
- `sur_name`: Họ
- `given_name`: Tên
- `dob`: Ngày sinh
- `gender`: Giới tính
- `country`: Quốc gia
- `nationality`: Quốc tịch
- `due_date`: Ngày hết hạn
- `person_number`: Mã số công dân,
- `image`: Ảnh passport đã được cắt và căn chỉnh
- `confidence`: Độ tin cậy của mrz code

Giấy yêu cầu bồi thường - `claim_form`

- `insure_name`: Họ tên người được bảo hiểm
- `insure_name_box`: Tọa độ của họ tên người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy của họ tên người được bảo hiểm
- `dob`: Ngày sinh người được bảo hiểm
- `dob_box`: Tọa độ của ngày sinh người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy của ngày sinh người được bảo hiểm
- `gender`: Giới tính người được bảo hiểm
- `gender_box`: Tọa độ của giới tính người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy của giới tính người được bảo hiểm
- `certificate_no`: Số thẻ bảo hiểm của người được bảo hiểm
- `certificate_no_box`: Tọa độ của số thẻ bảo hiểm người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `certificate_no_confidence`: Độ tin cậy của số thẻ bảo hiểm người được bảo hiểm
- `id_card_no`: Số CMND người được bảo hiểm
- `id_card_no_box`: Tọa độ của số CMND người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `id_card_no_confidence`: Độ tin cậy của số CMND người được bảo hiểm
- `family_member`: Tên người thân của người được bảo hiểm
- `family_member_box`: Tọa độ của tên người thân người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `family_member_confidence`: Độ tin cậy của tên người thân người được bảo hiểm
- `policy_holder`: Tên bên mua bảo hiểm
- `policy_holder_box`: Tọa độ của tên bên mua bảo hiểm là mảng gồm [left, top, right, bottom]
- `policy_holder_confidence`: Độ tin cậy của tên bên mua bảo hiểm
- `cellphone_no`: Số điện thoại người được bảo hiểm
- `cellphone_no_box`: Tọa độ của số điện thoại người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `cellphone_no_confidence`: Độ tin cậy của số điện thoại người được bảo hiểm
- `email` Email người được bảo hiểm
- `email_box`: Tọa độ của email người được bảo hiểm là mảng gồm [left, top, right, bottom]
- `email_confidence`: Độ tin cậy của email người được bảo hiểm
- `image`: Ảnh của giấy yêu cầu đã được cắt và căn chỉnh

Hóa đơn - `invoice`

- `account_bank`: Số tài khoản và ngân hàng đi kèm của nhà cung cấp. Trường này là một list. Mỗi phần tử trong list là một JSON biểu thị một số tài khoản và ngân hàng đi kèm. Phần
  tử này gồm các trường sau đây:
  - `account_no`: Số tài khoản
  - `account_no_box`: Tọa độ số tài khoản là một list gồm [left, top, right, bottom]
  - `account_no_confidence`: Độ tin cậy số tài khoản
  - `bank`: Tên ngân hàng
  - `bank_box`: Tọa độ tên ngân hàng là một list gồm [left, top, right, bottom]
  - `bank_confidence`: Độ tin cậy tên ngân hàng
  - `buyer_name`: Họ tên người mua hàng
  - `buyer_name_box`: Tọa độ họ tên người mua hàng là một list gồm [left, top, right, bottom]
- `buyer_name_confidence`: Độ tin cậy của họ tên người mua hàng
- `date`: Ngày lập hóa đơn
- `date_box`: Tọa độ ngày lập hóa đơn là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy của ngày lập hóa đơn
- `form`: Mẫu số
- `form_box`: Tọa độ mẫu số hóa đơn là một list gồm [left, top, right, bottom]
- `form_confidence`: Độ tin cậy của mẫu số
- `image` : Ảnh hóa đơn đã được cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc đỏ trên hóa đơn, định dạng base64
- `image_table`: Ảnh phần bảng trên hóa đơn
- `invoice_no`: Số hóa đơn
- `invoice_no_box`: Tọa độ số hóa đơn là một list gồm [left, top, right, bottom]
- `invoice_no_confidence`: Độ tin cậy của số hóa đơn
- `lookup_code`: Mã tra cứu hóa đơn
- `lookup_code_box`: Tọa độ mã tra cứu hóa đơn là một list gồm [left, top, right, bottom]
- `lookup_code_confidence`: Độ tin cậy mã tra cứu hóa đơn
- `lookup_website`: Đường dẫn trang web để tra cứu hóa đơn
- `lookup_website_box`: Tọa độ đường dẫn trang web là một list gồm [left, top, right, bottom]
- `lookup_website_confidence`: Độ tin cậy đường dẫn trang web
- `payment_method`: Hình thức thanh toán
- `payment_method_box`: Tọa độ hình thức thanh toán là một list gồm [left, top, right, -bottom]
- `payment_method_confidence`: Độ tin cậy của hình thức thanh toán
- `purchaser_name`: Tên đơn vị mua hàng
- `purchaser_name_box`: Tọa độ tên đơn vị mua hàng là một list gồm [left, top, right, bottom]
- `purchaser_name_confidence`: Độ tin cậy tên đơn vị mua hàng
- `serial_no`: Số ký hiệu hóa đơn
- `serial_no_box`: Tọa độ số ký hiệu hóa đơn là một list gồm [left, top, right, bottom]
- `serial_no_confidence`: Độ tin cậy của số ký hiệu hóa đơn
- `sub_total`: Tiền trước thuế
- `sub_total_box`: Tọa độ tiền trước thuế là một list gồm [left, top, right, bottom]
- `sub_total_confidence`: Độ tin cậy của tiền trước thuế
- `supplier`: Nhà cung cấp
- `supplier_box`: Tọa độ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_confidence` : Độ tin cậy của nhà cung cấp
- `supplier_address`: Địa chỉ nhà cung cấp
- `supplier_address_box`: Tọa độ địa chỉ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_address_confidence`: Độ tin cậy của địa chỉ nhà cung cấp
- `table`: Chứa thông tin trích xuất từ bảng. Là một list chứa thông tin của các hàng. Mỗi -phần tử trong list này là một list chứa thông tin của một hàng. Mỗi phần tử trong hàng là một dictionary chứa các thông tin sau:
  - `value`: Giá trị
  - `box`: Tọa độ là một list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy
  - `label`: Nhãn của cột tương ứng
    Lưu ý: Phần label có thể là:
  - `number`: Số thứ tự
  - `description`: Tên hàng hóa dịch vụ
  - `unit`: Đơn vị tính
  - `quantity`: Số lượng
  - `unit_price`: Đơn giá
  - `amount_before_tax`: Tổng tiền trước thuế
  - `tax`: Thuế suất
  - `tax_amount`: Tiền thuế
  - `amount_total`: Tổng tiền sau thuế
- `tax_code`: Mã số thuế nhà cung cấp
- `tax_code_box`: Tọa độ mã số thuế nhà cung cấp là một list gồm [left, top, right, bottom]
- `tax_code_confidence`: Độ tin cậy của mã số thuế nhà cung cấp
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy của tổng tiền
- `valid_seals`: Hóa đơn có dấu mộc đỏ hay không? Trả về True hoặc False
- `vat_amount`: Tiền thuế
- `vat_amount_box`: Tọa độ tiền thuế là một list gồm [left, top, right, bottom]
- `vat_amount_confidence`: Độ tin cậy của tiền thuế
- `vat_rate`: Thuế suất giá trị gia tăng
- `vat_rate_box`: Tọa độ thuế suất giá trị gia tăng là một list gồm [left, top, right, bottom]
- `vat_rate_confidence`: Độ tin cậy của thuế giá trị gia tăng

Giấy ra viện - `hospital_discharge_paper`

- `address`: Địa chỉ
- `address_box`: Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy địa chỉ
- `department`: Khoa
- `department_box`: Tọa độ khoa là một list gồm [left, top, right, bottom]
- `department_confidence`: Độ tin cậy khoa
- `diagnose`: Chẩn đoán
- `diagnose_box`: Tọa độ chẩn đoán là một list gồm [left, top, right, bottom]
- `diagnose_confidence`: Độ tin cậy chẩn đoán
- `gender`: Giới tính
- `gender_box`: Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy giới tính
- `hospital_discharge_date`: Ngày ra viện
- `hospital_discharge_date_box`: Tọa độ ngày ra viện là một list gồm [left, top, right, bottom]
- `hospital_discharge_date_confidence`: Độ tin cậy ngày ra viện
- `hospitalization_date`: Ngày vào viện
- `hospitalization_date_box`: Tọa độ ngày vào viện là một list gồm [left, top, right, bottom]
- `hospitalization_date_confidence`: Độ tin cậy ngày vào viện
- `icd_10`: Là một list thông tin về mã bệnh theo chuẩn icd 10. Mỗi phần tử trong list là một dictionary có các trường:
  - `icd`: Giá trị mã icd 10
  - `box`: Tọa độ tương ứng với mã icd 10 là list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy mã icd 10
- `image`: Ảnh của giấy ra viện đã được căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc đỏ trên giấy ra viện, định dạng base64
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy tên cơ sở y tế
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy họ tên bệnh nhân
- `pid`: Mã y tế / pid
- `pid_box`: Tọa độ mã y tế / pid là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy mã y tế / pid
- `treatments`: Phương pháp điều trị
- `treatments_box`: Tọa độ phương pháp điều trị là một list gồm [left, top, right, bottom]
- `treatments_confidence`: Độ tin cậy phương pháp điều trị
- `valid_seals`: Có dấu mộc đỏ trên giấy ra viện hay không? Trả về True hoặc False
- `year_of_birth`: Năm sinh/tuổi
- `year_of_birth_box`: Tọa độ năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `year_of_birth_confidence`: Độ tin cậy năm sinh/tuổi
- `account_number`: Số tài khoản
- `account_number_box`: Tọa độ của số tài khoản là list gồm [left, top, right, bottom]
- `account_number_confidence`: Độ tin cậy của số tài khoản
- `bank`: Tên ngân hàng
- `bank_box`: Tọa độ của tên ngân hàng là list gồm [left, top, right, bottom]
- `bank_confidence`: Độ tin cậy của tên ngân hàng
- `beneficiary`: Tên tài khoản
- `beneficiary_box`: Tọa độ của tên tài khoản là list gồm [left, top, right, bottom]
- `beneficiary_confidence`: Độ tin cậy của tên tài khoản
- `cash`: Hình thức nhận tiền
- `cash_box`: Tọa độ của hình thức nhận tiền là list gồm [left, top, right, bottom]
- `cash_confidence`: Độ tin cậy của hình thức nhận tiền
- `claimant`: Họ tên người yêu cầu bồi thường
- `claimant_box`: Tọa độ họ tên người yêu cầu bồi thường là một list gồm [left, top, right, bottom]
- `claimant_confidence`: Độ tin cậy của người yêu cầu bồi thường
- `claimant_address`: Địa chỉ người yêu cầu bồi thường
- `claimant_address_box`: Tọa độ địa chỉ người yêu cầu bồi thường là một list gồm [left, top, right, bottom]
- `claimant_address_confidence`: Độ tin cậy của người yêu cầu bồi thường
- `claimant_email`: Email của người yêu cầu bồi thường
- `claimant_email_box`: Tọa độ email người yêu cầu bồi thường là một list gồm [left, top, right, bottom]
- `claimant_email_confidence`: Độ tin cậy của email người yêu cầu bồi thường
- `claimant_phone` Số điện thoại người yêu cầu bồi thường
  claimant_phone_box: Tọa độ số điện thoại người yêu cầu bồi thường là một list gồm [left, top, right, bottom]
- `claimant_phone_confidence`: Độ tin cậy của số điện thoại người yêu cầu bồi thường
- `date_of_accident`: Ngày xảy ra
- `date_of_accident_box`: Tọa độ của ngày xảy ra là list gồm [left, top, right, bottom]
- `date_of_accident_confidence`: Độ tin cậy của ngày xảy ra
- `diagnose`: Chẩn đoán
- `diagnose_box`: Tọa độ của chẩn đoán là list gồm [left, top, right, bottom]
- `diagnose_confidence`: Độ tin cậy của chẩn đoán
- `email`: Email
- `email_box`: Tọa độ của email là list gồm [left, top, right, bottom]
- `email_confidence`: Độ tin cậy của email
- `id_card`: Số cmnd nhận tiền mặt
- `id_card_box`: Tọa độ của số cmnd nhận tiền mặt là list gồm [left, top, right, bottom]
- `id_card_confidence`: Độ tin cậy của số cmnd nhận tiền mặt
- `image`: Ảnh của giấy yêu cầu đã được cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc đỏ trên giấy yêu cầu, định dạng base64
- `insure_name`: Họ tên người được bảo hiểm
- `insure_name_box`: Tọa độ của họ tên người được bảo hiểm là list gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy của họ tên người được bảo hiểm
- `medical_facility`: Cơ sở khám, điều trị
- `medical_facility_box`: Tọa độ của cơ sở khám, điều trị là list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy của cơ sở khám, điều trị
- `phone_number`: Số điện thoại
- `phone_number_box`: Tọa độ của số điện thoại là list gồm [left, top, right, bottom]
- `phone_number_confidence`: Độ tin cậy của số điện thoại
- `policy_no`: Số thẻ / Số GCNBH
- `policy_no_box`: Tọa độ của số thẻ / số GCNBH là list gồm [left, top, right, bottom]
- `policy_no_confidence`: Độ tin cậy của số thẻ / số GCNBH
- `total_insured_amount`: Tổng số tiền yêu cầu bồi thường
- `total_insured_amount_box`: Tọa độ của tổng số tiền yêu cầu bồi thường là list gồm [left, top, right, bottom]
- `total_insured_amount_confidence`: Độ tin cậy của tổng số tiền yêu cầu bồi thường
- `treatment_method`: Hình thức điều trị
- `treatment_method_box`: Tọa độ của hình thức điều trị là list gồm [left, top, right, bottom]
- `treatment_method_confidence`: Độ tin cậy của hình thức điều trị
- `valid_seals`: Có dấu mộc đỏ trên giấy yêu cầu bồi thường không? Trả về True hoặc False

Thẻ bên Bảo Việt - `bvcard`

- `name`: Họ tên
- `name_box`: Tọa độ họ và tên là list gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy của họ tên
- `plan`: Chương trình
- `plan_box`: Tọa độ chương trình là list gồm [left, top, right, bottom]
- `plan_confidence`: Độ tin cậy chương trình
- `company`: Công ty
- `company_box`: Tọa độ công ty là list gồm [left, top, right, bottom]
- `company_confidence`: Độ tin cậy công ty
- `valid`: Hiệu lực
- `valid_box`: Tọa độ hiệu lực là list gồm [left, top, right, bottom]
- `valid_confidence`: Độ tin cậy hiệu lực
- `policy_no`: Số thẻ
- `policy_no_box`: Tọa độ số thẻ là list gồm [left, top, right, bottom]
- `policy_no_confidence`: Độ tin cậy số thẻ
- `image`: Ảnh thẻ đã cắt và căn chỉnh

Giấy tờ tùy thân - `id_doc`

- `address`: Địa chỉ
- `address_box`: Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy địa chỉ
- `dob`: Ngày sinh
- `dob_box`: Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence` Độ tin cậy ngày sinh
- `gender`: Giới tính
- `gender_box`: Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy giới tính
- `image`: Ảnh giấy tờ đã được cắt và căn chỉnh
- `name`: Họ tên
- `name_box`: Tọa độ họ tên là một list gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy họ tên
- `nationality` Quốc tịch
- `nationality_box`: Tọa độ quốc tịch là một list gồm [left, top, right, bottom]
- `nationality_confidence`: Độ tin cậy quốc tịch

Bảng kê - `list_expense`

- `address`: Địa chỉ
- `address_box`: Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy địa chỉ
- `diagnosis`: Chẩn đoán
- `diagnosis_box`: Tọa độ chẩn đoán là một list gồm [left, top, right, bottom]
- `diagnosis_confidence`: Độ tin cậy chẩn đoán
- `hospital_discharge_date`: Ngày ra viện
- `hospital_discharge_date_box`: Tọa độ ngày ra viện là một list gồm [left, top, right, bottom]
- `hospital_discharge_date_confidence`: Độ tin cậy ngày ra viện
- `hospitalization_date`: Ngày vào viện
- `hospitalization_date_box`: Tọa độ ngày vào viện là một list gồm [left, top, right, bottom]
- `hospitalization_date_confidence`: Độ tin cậy ngày vào viện
- `icd_10`: là một list thông tin về mã bệnh theo chuẩn icd 10. Mỗi phần tử trong list là một dictionary có các trường:
  - `icd`: Giá trị mã icd 10
  - `box`: Tọa độ tương ứng với mã icd 10 là list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy mã icd 10
- `image`: Ảnh bảng kê đã căn chỉnh, định dạng base64 (bản cũ)
- `image_list`: Là một list ảnh định dạng base64 tương ứng với từng trang bảng kê (bản mới)
- `mage_seals`: Ảnh dấu mộc đỏ trên bảng kê, định dạng base64
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy tên cơ sở y tế
- `patient_name`: Họ tên
- `patient_name_box`: Tọa độ họ tên là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy họ tên
- `pid`: Mã y tế/ Mã bệnh nhân
- `pid_box`: Tọa độ mã y tế/ mã bệnh nhân là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy mã y tế/ mã bệnh nhân
- `table`: Chứa thông tin của bảng, là một json gồm các trường thông tin sau đây:

  - `image_table`: Là một list ảnh table định dạng base64
  - `page_table`: List index của trang chứa từng table trong image_table
  - `info_table`: Là list ứng với từng table trong image_table. Từng phần tử trong trường này có cấu trúc như sau:

  ```python
  [
  [json_0, json_1, json_2, json_3] //biểu thị từng row
  [...]
  ...
  ]//biểu thị của 1 bảng được crop ra
  Trong đó:
  json_0: Thông tin cho trường Tên hàng hóa, nội dung
  json_1: Thông tin cho trường Số tiền người bệnh phải trả
  json_2: Thông tin cho trường Số lượng
  json_3: Thông tin cho trường Đơn giá
  Và mỗi json này có cấu trúc như sau:
  {
  value: //Giá trị text trong ô
  score: //Độ tin cậy
  box: //Vị trí của ô trong bảng là list gồm [left, top, right, bottom]
  {
  ```

- `table_date`: Ngày bảng kê
- `table_date_box`: Tọa độ ngày bảng kê là một list gồm [left, top, right, bottom]
- `table_date_confidence`: Độ tin cậy ngày bảng kê
- `table_number`: Số bảng kê
- `table_number_box`: Tọa độ số bảng kê là một list gồm [left, top, right, bottom]
- `table_number_confidence`: Độ tin cậy số bảng kê
- `total_payment`: Tổng tiền thanh toán
- `total_payment_box`: Tọa độ tổng tiền thanh toán là một list gồm [left, top, right, bottom]
- `total_payment_confidence`: Độ tin cậy tổng tiền thanh toán
- `valid_seals`: Có dấu mộc đỏ trên bảng kê hay không? Trả về True hoặc False

Đơn thuốc - `prescription`

- `address`: Địa chỉ
- `address_box`: Tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy địa chỉ
- `diagnose`: Chuẩn đoán
- `diagnose_box`: Tọa độ chẩn đoán là một list gồm [left, top, right, bottom]
- `diagnose_confidence`: Độ tin cậy chẩn đoán
- `drug_info`: Thông tin các loại thuốc, là một list, mỗi phần tử trong list là một json có định dạng như sau:
  - `box`: Tọa độ của tên thuốc là một list gồm [left, top, right, bottom]
  - `drug`: Tên thuốc
  - `quanlity`: Số lượng
  - `score`: Độ tin cậy của tên thuốc
  - `gender`: Giới tính
- `gender_box`: Tọa độ giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy giới tính
- `icd_10`: Là một list thông tin về mã bệnh theo chuẩn icd 10. Mỗi phần tử trong list là một dictionary có các trường:
  - `icd`: Giá trị mã icd 10
  - `box`: Tọa độ tương ứng với mã icd 10 là list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy mã icd 10
- `image`: Ảnh đơn thuốc đã được căn chỉnh, định dạng basa64
- `image_drug`: Ảnh bảng chứa thông tin các loại thuốc, định dạng base64
- `image_seals`: Ảnh dấu mộc đỏ trên đơn thuốc, định dạng base64
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy tên cơ sở y tế
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy họ tên bệnh nhân
- `pid`: Mã y tế / pid
- `pid_box`: Tọa độ mã y tế / pid là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy mã y tế / pid
- `prescription_date`: Ngày kê đơn
- `prescription_date_box`: Tọa độ ngày kê đơn là một list gồm [left, top, right, bottom]
- `prescription_date_confidence`: Độ tin cậy ngày kê đơn
- `valid_seals`: Có dấu mộc đỏ trên đơn thuốc hay không? Trả về True hoặc False
- `year_of_birth`: Năm sinh/tuổi
- `year_of_birth_box`: Tọa độ năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `year_of_birth_confidence`: Độ tin cậy năm sinh/tuổi

Giấy xác nhận bảo lãnh - `guarantee_confirmation`

- `claim_form_no`: Số yêu cầu bồi thường
- `claim_form_no_box`: Tọa độ số yêu cầu bồi thường là một list gồm [left, top, right, bottom]
- `claim_form_no_confidence`: Độ tin cậy số yêu cầu bồi thường
- `conclusion`: Kết luận của bác sỹ sau xuất viện
- `conclusion_box`: Tọa độ kết luận của bác sỹ sau xuất viện là một list gồm [left, top, right, bottom]
- `conclusion_confidence`: Độ tin cậy kết luận của bác sỹ sau xuất viện
- `condition`: Tình trạng bệnh/tai nạn
- `condition_box`: Tọa độ tình trạng bệnh/tai nạn là một list gồm [left, top, right, bottom]
- `condition_confidence`: Độ tin cậy tình trạng bệnh/tai nạn
- `created_date`: Ngày lập
- `created_date_box`: Tọa độ ngày lập là một list gồm [left, top, right, bottom]
- `created_date_confidence`: Độ tin cậy ngày lập
- `date_of_consultation`: Ngày khám
- `date_of_consultation_box`: Tọa độ ngày khám là một list gồm [left, top, right, bottom]
- `date_of_consultation_confidence`: Độ tin cậy ngày khám
- `dob`: Ngày sinh
- `dob_box`: Tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy ngày sinh
- `from_date`: Từ ngày
- `from_date_box`: Tọa độ từ ngày là một list gồm [left, top, right, bottom]
- `from_date_confidence`: Độ tin cậy từ ngày
- `guaranteed_expenses`: Chi phí bảo lãnh
- `guaranteed_expenses_box`: Tọa độ chi phí bảo lãnh là một list gồm [left, top, right, bottom]
- `guaranteed_expenses_confidence`: Độ tin cậy chi phí bảo lãnh
- `id_no`: Số cmnd
- `id_no_box`: Tọa độ số cmt là một list gồm [left, top, right, bottom]
- `id_no_confidence`: Độ tin cậy số cmt
- `image`: Ảnh giấy xác nhận bảo lãnh đã cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc ở trên giấy xác nhận bảo lãnh, định dạng base64
- `insured`: Người được bh
- `insured_box`: Tọa độ người được bh là một list gồm [left, top, right, bottom]
- `insured_confidence`: Độ tin cậy người được bh
- `insured_confirmation`: Xác nhận và cam kết
- `insured_confirmation_box`: Tọa độ xác nhận và cam kết là một list gồm [left, top, right, bottom]
- `insured_confirmation_confidence`: Độ tin cậy xác nhận và cam kết
- `medical_expenses`: Chi phí phát sinh
- `medical_expenses_box`: Tọa độ chi phí phát sinh là một list gồm [left, top, right, bottom]
- `medical_expenses_confidence`: Độ tin cậy chi phí phát sinh
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy tên cơ sở y tế
- `paid_by_insured`: Chi phí nđbh tự trả
- `paid_by_insured_box`: Tọa độ chi phí nđbh tự trả là một list gồm [left, top, right, bottom]
- `paid_by_insured_confidence`: Độ tin cậy chi phí nđbh tự trả
- `period_of_insurance`: Hiệu lực bảo hiểm
- `period_of_insurance_box`: Tọa độ hiệu lực bảo hiểm là một list gồm [left, top, right, bottom]
- `period_of_insurance_confidence`: Độ tin cậy ngày kê đơn
- `policy_holder`: Đơn vị tham gia bảo hiểm
- `policy_holder_box`: Tọa độ đơn vị tham gia bảo hiểm là một list gồm [left, top, right, bottom]
- `policy_holder_confidence`: Độ tin cậy đơn vị tham gia bảo hiểm
- `policy_no`: Số thẻ bảo hiểm
- `policy_no_box`: Tọa độ số thẻ bảo hiểm là một list gồm [left, top, right, bottom]
- `policy_no_confidence`: Độ tin cậy số thẻ bảo hiểm
- `rehabilitation_type`: Nội trú/ ngoại trú
- `rehabilitation_type_box`: Tọa độ nội trú/ ngoại trú là một list gồm [left, top, right, bottom]
- `rehabilitation_type_confidence`: Độ tin cậy nội trú/ ngoại trú
- `to_date`: Đến ngày
- `to_date_box`: Tọa độ đến ngày là một list gồm [left, top, right, bottom]
- `to_date_confidence`: Độ tin cậy đến ngày
- `valid_seals`: Có dấu mộc trên giấy xác nhận bảo lãnh hay không? Trả về True hoặc False
- `warranty_notes`: Ghi chú và xác nhận
- `warranty_notes_box`: Tọa độ ghi chú và xác nhận là một list gồm [left, top, right, bottom]
- `warranty_notes_confidence`: Độ tin cậy ghi chú và xác nhận

Giấy chứng nhận phẫu thuật - `surgical_certificate`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `anesthesiologist`: Bác sỹ gây mê
- `anesthesiologist_box`: Tọa độ Bác sỹ gây mê là một list gồm [left, top, right, bottom]
- `anesthesiologist_confidence`: Độ tin cậy Bác sỹ gây mê
- `anesthetic_method`: Phương pháp vô cảm
- `anesthetic_method_box`: Tọa độ Phương pháp vô cảm là một list gồm [left, top, right, bottom]
- `anesthetic_method_confidence`: Độ tin cậy Phương pháp vô cảm
- `department`: Khoa
- `department_box`: Tọa độ khoa là một list gồm [left, top, right, bottom]
- `department_confidence`: Độ tin cậy khoa
- `diagnose`: Chẩn đoán
- `diagnose_box`: Tọa độ Chẩn đoán là một list gồm [left, top, right, bottom]
- `diagnose_confidence`: Độ tin cậy Chẩn đoán
- `dob`: Năm sinh/tuổi
- `dob_box`: Tọa độ năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `hospital_discharge_date`: Ngày ra viện
- `hospital_discharge_date_box`: Tọa độ Ngày ra viện là một list gồm [left, top, right, bottom]
- `hospital_discharge_date_confidence`: Độ tin cậy Ngày ra viện
- `hospitalization_date`: Ngày vào viện
- `hospitalization_date_box`: Tọa độ Ngày vào viện là một list gồm [left, top, right, bottom]
- `hospitalization_date_confidence`: Độ tin cậy Ngày vào viện
- `image`: Ảnh giấy chứng nhận phẫu thuật đã cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên giấy chứng nhận phẫu thuật, định dạng base64
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy tên cơ sở y tế
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: ọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế / PID
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `surgical_day`: Ngày phẫu thuật
- `surgical_day_box`: Tọa độ Ngày phẫu thuật là một list gồm [left, top, right, bottom] -- `surgical_doctor`: Bác sỹ phẫu thuật
- `surgical_day_confidence`: Độ tin cậy Ngày phẫu thuật
- `surgical_doctor_box`: Tọa độ Bác sỹ phẫu thuật là một list gồm [left, top, right, bottom]
- `surgical_doctor_confidence`: Độ tin cậy Bác sỹ phẫu thuật
- `valid_seals`: Có dấu mộc trên giấy chứng nhận phẫu thuật hay không? Trả về True hoặc False

Báo cáo ra viện - `discharge_report`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `definitive_diagnosis`: Chẩn đoán xác định
- `definitive_diagnosis_box`: Tọa độ Chẩn đoán xác định là một list gồm [left, top, right, bottom]
- `definitive_diagnosis_confidence`: Độ tin cậy Chẩn đoán xác định
- `department`: Khoa
- `department_box`: Tọa độ Khoa là một list gồm [left, top, right, bottom]
- `department_confidence`: Độ tin cậy Khoa
- `discharge_date`: Ngày ra viện
- `discharge_date_box`: Tọa độ Ngày ra viện là một list gồm [left, top, right, bottom]
- `discharge_date_confidence`: Độ tin cậy Ngày ra viện
- `dob`: Năm sinh/Tuổi
- `dob_box`: Tọa độ Năm sinh/Tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/Tuổi
- `followup_treatment_plan`: Kế hoạch điều trị tiếp theo
- `followup_treatment_plan_box`: Tọa độ Kế hoạch điều trị tiếp theo là một list gồm [left, top, right, bottom]
- `followup_treatment_plan_confidence`: Độ tin cậy Kế hoạch điều trị tiếp theo
- `gender`: Giới tính
- `ender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `hospital_discharge_status`: Tình trạng ra viện
- `hospital_discharge_status_box`: Tọa độ Tình trạng ra viện là một list gồm [left, top, right, bottom]
- `hospital_discharge_status_confidence`: Độ tin cậy Tình trạng ra viện
- `hospitalization_date`: Ngày vào viện
- `hospitalization_date_box`: Tọa độ Ngày vào viện là một list gồm [left, top, right, bottom]
- `hospitalization_date_confidence`: Độ tin cậy Ngày vào viện
- `hospitalization_reason`: Lý do vào viện
- `hospitalization_reason_box`: Tọa độ Lý do vào viện là một list gồm [left, top, right, bottom]
- `hospitalization_reason_confidence`: Độ tin cậy Lý do vào viện
- `image`: Ảnh giấy báo cáo ra viện đã được xoay và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên báo cáo ra viện, định dạng base64
- `pathological_process`: Quá trình bệnh lý/ Bệnh sử
- `pathological_process_box`: Tọa độ Quá trình bệnh lý/ Bệnh sử là một list gồm [left, top, right, bottom]
- `pathological_process_confidence`: Độ tin cậy Quá trình bệnh lý/ Bệnh sử
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế / PID
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `preliminary_diagnosis`: Kết quả cận lâm sàng
- `preliminary_diagnosis_box`: Tọa độ Kết quả cận lâm sàng là một list gồm [left, top, right, bottom]
- `preliminary_diagnosis_confidence`: Độ tin cậy Kết quả cận lâm sàng
- `prescribed_medicines`: Các thuốc chính đã dùng
- `prescribed_medicines_box`: Tọa độ Các thuốc chính đã dùng là một list gồm [left, top, right, bottom]
- `prescribed_medicines_confidence`: Độ tin cậy Các thuốc chính đã dùng
- `treatment_method`: Phương pháp điều trị
- `treatment_method_box`: Tọa độ Phương pháp điều trị là một list gồm [left, top, right, bottom]
- `treatment_method_confidence`: Độ tin cậy Phương pháp điều trị
- `valid_seals`: Có dấu mộc trên báo cáo ra viện hay không? Trả về True hoặc False

Báo cáo y tế - `medical_report`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `clinical_examination`: Khám lâm sàng
- `clinical_examination_box`: Tọa độ Khám lâm sàng là một list gồm [left, top, right, bottom]
- `clinical_examination_confidence`: Độ tin cậy Khám lâm sàng
- `date_of_examination`: Ngày khám
- `date_of_examination_box`: Tọa độ Ngày khám là một list gồm [left, top, right, bottom]
- `date_of_examination_confidence`: Độ tin cậy Ngày khám
- `date_of_reexamination` Ngày tái khám
- `date_of_reexamination_box`: Tọa độ Hẹn ngày tái khám là một list gồm [left, top, right, bottom]
- `date_of_reexamination_confidence`: Độ tin cậy Hẹn ngày tái khám
- `dob`: Năm sinh/Tuổi
- `dob_box`: Tọa độ Năm sinh/Tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/Tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `icd`: Mã ICD/ Chẩn đoán theo ICD
- `icd_box`: Tọa độ Mã icd là một list gồm [left, top, right, bottom]
- `icd_confidence`: Độ tin cậy Mã icd
- `image`: Ảnh giấy báo cáo y tế đã được xoay và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên báo cáo y tế, định dạng base64
- `medical_history`: Tiền sử bệnh
- `medical_history_box`: Tọa độ Tiền sử là một list gồm [left, top, right, bottom]
- `medical_history_confidence`: Độ tin cậy Tiền sử
- `medical_tests`: Các xét nghiệm, thăm dò chính
- `medical_tests_box`: Tọa độ Các xét nghiệm, thăm dò chính là một list gồm [left, top, right, bottom]
- `medical_tests_confidence`: Độ tin cậy Các xét nghiệm, thăm dò chính
- `pathological_process`: Quá trình bệnh lý/ Bệnh sử
- `pathological_process_box`: Tọa độ Quá trình bệnh lý/ Bệnh sử là một list gồm [left, top, right, bottom]
- `pathological_process_confidence`: Độ tin cậy Quá trình bệnh lý/ Bệnh sử
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế/ Mã người bệnh
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `preliminary_diagnosis`: Chẩn đoán sơ bộ
- `preliminary_diagnosis_box`: Tọa độ Chẩn đoán sơ bộ là một list gồm [left, top, right, bottom]
- `preliminary_diagnosis_confidence`: Độ tin cậy Chẩn đoán sơ bộ
- `symptom`: Lý do đến khám/ Triệu chứng
- `symptom_box`: Tọa độ Lý do đến khám/ Triệu chứng là một list gồm [left, top, right, bottom]
- `symptom_confidence`: Độ tin cậy Lý do đến khám/ Triệu chứng
- `treatment_method`: Hướng điều trị.
- `treatment_method_box`: Tọa độ Hướng điều trị là một list gồm [left, top, right, bottom]
- `treatment_method_confidence`: Độ tin cậy Hướng điều trị
- `valid_seals`: Có dấu mộc trên báo cáo y tế hay không? Trả về True hoặc False

Phiếu chỉ dịnh - `specify_vote`

- `address`: Địa chỉ.
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `designated_date`: Ngày chỉ định.
- `designated_date_box`: Tọa độ Ngày chỉ định là một list gồm [left, top, right, bottom]
- `designated_date_confidence`: Độ tin cậy Ngày chỉ định
- `designated_doctor`: Bác sỹ chỉ định.
- `designated_doctor_box`: Tọa độ Bác sỹ chỉ định là một list gồm [left, top, right, bottom]
- `designated_doctor_confidence`: Độ tin cậy Bác sỹ chỉ định
- `designated_place`: Nơi chỉ định.
- `designated_place_box`: Tọa độ Nơi chỉ định là một list gồm [left, top, right, bottom]
- `designated_place_confidence`: Độ tin cậy Nơi chỉ định
- `dob`: Năm sinh/ Tuổi.
- `dob_box`: Tọa độ Năm sinh/Tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/ Tuổi
- `gender`: Giới tính.
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `image`: Ảnh phiếu chỉ định đã được xoay và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên phiếu chỉ định, định dạng base64
- `medical_facility`: Tên cơ sở y tế.
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `patient_name`: Họ tên bệnh nhân.
- `patient_name_box`: Tọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế / PID.
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `preliminary_diagnosis`: Chẩn đoán sơ bộ.
- `preliminary_diagnosis_box`: Tọa độ Chẩn đoán sơ bộ là một list gồm [left, top, right, bottom]
- `preliminary_diagnosis_confidence`: Độ tin cậy Chẩn đoán sơ bộ
- `test_place`: Nơi thực hiện.
- `test_place_box`: Tọa độ Nơi thực hiện là một list gồm [left, top, right, bottom]
- `test_place_confidence`: Độ tin cậy Nơi thực hiện
- `valid_seals`: Có dấu mộc trên phiếu chỉ định hay không? Trả về True hoặc False

Phiếu kết quả xét nghiệm - `test_results`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `designated_date`: Ngày chỉ định
- `designated_date_box`: Tọa độ Ngày chỉ định là một list gồm [left, top, right, bottom]
- `designated_date_confidence`: Độ tin cậy Ngày chỉ định
- `designated_doctor`: Bác sỹ chỉ định
- `designated_doctor_box`: Tọa độ Bác sỹ chỉ định là một list gồm [left, top, right, bottom]
- `designated_doctor_confidence`: Độ tin cậy Bác sỹ chỉ định
- `dob`: Năm sinh/Tuổi
- `dob_box`: Tọa độ Năm sinh/Tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/Tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `image`: Ảnh phiếu kết quả đã được xoay và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên phiếu kết quả, định dạng base64
- `medical_facility`: Tên cơ sở y tế.
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế / PID
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `preliminary_diagnosis`: Chẩn đoán sơ bộ
- `preliminary_diagnosis_box`: Tọa độ Chẩn đoán sơ bộ là một list gồm [left, top, right, bottom]
- `preliminary_diagnosis_confidence`: Độ tin cậy Chẩn đoán sơ bộ
- `test_date`: Ngày thực hiện
- `test_date_box`: Tọa độ Ngày thực hiện là một list gồm [left, top, right, bottom]
- `test_date_confidence`: Độ tin cậy Ngày thực hiện
- `valid_seals`: Có dấu mộc trên phiếu kết quả hay không? Trả về True hoặc False

Tường trình tai nạn - `accident_report`

- `name`: Họ tên
- `name_box`: Tọa độ Họ tên là một list gồm [left, top, right, bottom]
- `name_confidence`: Độ tin cậy Họ tên
- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `date_of_accident`: Ngày xảy ra tai nạn
- `date_of_accident_box`: Tọa độ Ngày xảy tai nạn là một list gồm [left, top, right, bottom]
- `date_of_accident_confidence`: Độ tin cậy Ngày xảy ra tai nạn
- `location` Địa điểm
- `location_box`: Tọa độ Địa điểm là một list gồm [left, top, right, bottom]
- `location_confidence`: Độ tin cậy Địa điểm
- `image`: Ảnh giấy tường trình tai nạn đã được xoay và căn chỉnh
- `image_seals`: Ảnh dấu mộc trên giấy tường trình tai nạn, định dạng base64
- `valid_seals`: Có dấu mộc trên giấy tường trình tai nạn hay không? Trả về True hoặc False

Biên lai - `bill`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `date`: Ngày biên lai
- `date_box`: Tọa độ Ngày biên lai là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy Ngày biên lai
- `dob`: Năm sinh/tuổi
- `dob_box`: Tọa độ Năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `image`: Ảnh biên lai đã cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên biên lai, định dạng base64
- `insure_name`: Tên người được bảo hiểm
- `insure_name_box`: Tọa độ Tên người được bảo hiểm là một list gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy Tên người được bảo hiểm
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ Tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy Tổng tiền
- `valid_seals`: Có dấu mộc trên biên lai hay không? Trả về True hoặc False

Phiếu thu - `receipts`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `date`: Ngày phiếu thu
- `date_box`: Tọa độ Ngày phiếu thu là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy Ngày phiếu thu
- `dob`: Năm sinh/tuổi
- `dob_box`: Tọa độ Năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `image`: Ảnh phiếu thu đã cắt và căn chỉnh
- `image_seals`: Ảnh dấu mộc trên phiếu thu, định dạng base64
- `insure_name`: Tên người được bảo hiểm
- `insure_name_box`: Tọa độ Tên người được bảo hiểm là một list gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy Tên người được bảo hiểm
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ Tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy Tổng tiền
- `valid_seals`: Có dấu mộc trên phiếu thu hay không? Trả về True hoặc False

Sổ khám bệnh - `health_records`

- `dob`: Năm sinh/tuổi
- `dob_box`: Tọa độ Năm sinh/tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `image`: Ảnh sổ khám bệnh đã cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên sổ khám bệnh, định dạng base64
- `insure_name`: Tên người được bảo hiểm
- `insure_name_box`: Tọa độ Tên người được bảo hiểm là một list gồm [left, top, right, bottom]
- `insure_name_confidence`: Độ tin cậy Tên người được bảo hiểm
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `valid_seals`: Có dấu mộc trên sổ khám bệnh hay không? Trả về True hoặc False

Phiếu khám - `medical_examination`

- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom]
- `address_confidence`: Độ tin cậy Địa chỉ
- `clinical_examination`: Khám lâm sàng
- `clinical_examination_box`: Tọa độ Khám lâm sàng là một list gồm [left, top, right, bottom]
- `clinical_examination_confidence`: Độ tin cậy Khám lâm sàng
- `conclusion`: Kết luận
- `conclusion_box`: Tọa độ Kết luận là một list gồm [left, top, right, bottom]
- `conclusion_confidence`: Độ tin cậy Kết luận
- `date_of_examination`: Ngày khám
- `date_of_examination_box`: Tọa độ Ngày khám là một list gồm [left, top, right, bottom]
- `date_of_examination_confidence`: Độ tin cậy Ngày khám
- `definitive_diagnosis`: Chẩn đoán xác định
- `definitive_diagnosis_box`: Tọa độ Chẩn đoán xác định là một list gồm [left, top, right, bottom]
- `definitive_diagnosis_confidence`: Độ tin cậy Chẩn đoán xác định
- `dob`: Năm sinh/Tuổi
- `dob_box`: Tọa độ Năm sinh/Tuổi là một list gồm [left, top, right, bottom]
- `dob_confidence`: Độ tin cậy Năm sinh/Tuổi
- `gender`: Giới tính
- `gender_box`: Tọa độ Giới tính là một list gồm [left, top, right, bottom]
- `gender_confidence`: Độ tin cậy Giới tính
- `icd_10`: Là một list thông tin về mã bệnh theo chuẩn icd 10. Mỗi phần tử trong list là một dictionary có các trường:
  - `icd`: Giá trị mã icd 10
  - `box`: Tọa độ tương ứng với mã icd 10 là list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy mã icd 10
- `image`: Ảnh phiếu khám đã cắt và căn chỉnh, định dạng base64
- `image_seals`: Ảnh dấu mộc trên phiếu khám, định dạng base64
- `medical_facility`: Tên cơ sở y tế
- `medical_facility_box`: Tọa độ Tên cơ sở y tế là một list gồm [left, top, right, bottom]
- `medical_facility_confidence`: Độ tin cậy Tên cơ sở y tế
- `medical_history`: Tiền sử bệnh
- `medical_history_box`: Tọa độ Tiền sử là một list gồm [left, top, right, bottom]
- `medical_history_confidence`: Độ tin cậy Tiền sử
- `pathological_process`: Quá trình bệnh lý/ Bệnh sử
- `pathological_process_box`: Tọa độ Quá trình bệnh lý/ Bệnh sử là một list gồm [left, top, right, bottom]
- `pathological_process_confidence`: Độ tin cậy Quá trình bệnh lý/ Bệnh sử
- `patient_name`: Họ tên bệnh nhân
- `patient_name_box`: Tọa độ Họ tên bệnh nhân là một list gồm [left, top, right, bottom]
- `patient_name_confidence`: Độ tin cậy Họ tên bệnh nhân
- `pid`: Mã y tế/ Mã người bệnh
- `pid_box`: Tọa độ Mã y tế / PID là một list gồm [left, top, right, bottom]
- `pid_confidence`: Độ tin cậy Mã y tế / PID
- `preliminary_diagnosis`: Chẩn đoán sơ bộ
- `preliminary_diagnosis_box`: Tọa độ Chẩn đoán sơ bộ là một list gồm [left, top, right, bottom]
- `preliminary_diagnosis_confidence`: Độ tin cậy Chẩn đoán sơ bộ
- `symptom`: Lý do đến khám/ Triệu chứng
- `symptom_box`: Tọa độ Lý do đến khám/ Triệu chứng là một list gồm [left, top, right, bottom]
- `symptom_confidence`: Độ tin cậy Lý do đến khám/ Triệu chứng
- `valid_seals`: Có dấu mộc trên phiếu khám hay không? Trả về True hoặc False

Bảng mã lỗi errorCode và errorMessage

| errorCode | errorMessage                       | Mô tả                          |
| --------- | ---------------------------------- | ------------------------------ |
| 0         | Success                            | Thành công                     |
| 1         | Incorrect image format             | Ảnh bị lỗi                     |
| 2         | Url is unavailable                 | Link ảnh bị lỗi                |
| 3         | The photo does not contain content | Ảnh không chứa nội dung        |
| 4         | Incorrect Api_key or api_secret    | api_key hoặc api_secret sai    |
| 5         | Out of requests                    | Hết số lượng requests hữu dụng |
| 6         | Error when processing the request  | Lỗi khi xử lý request          |
