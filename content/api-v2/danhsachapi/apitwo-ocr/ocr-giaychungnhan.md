---
title: 'Giấy chứng nhận'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
id: 22
metaDescription: 'This is the api v2 for this page'
---

#### 1. Trích xuất thông tin Giấy chứng nhận đăng ký doanh nghiệp với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                                             |
| ------ | ------------------------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/business_registration` |

**Params**:

| Key           | Value                           | Mô tả                                                                         |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                                          |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false`                  | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

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
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

**Body**:

| Key   | Type | Value         | Mô tả                                                                                    |
| ----- | ---- | ------------- | ---------------------------------------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf của Giấy chứng nhận đăng ký doanh nghiệp cần trích xuất thông tin |

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
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64`                   |
| `get_thumb`   | `true`/`false` | trả về ảnh của Giấy chứng nhận đăng ký doanh nghiệp đã được xoay và căn chỉnh |

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

Chú ý: Trường hợp trích xuất thông tin từ file PDF, nhiều loại giấy tờ trong một ảnh, bằng lái xe, đăng ký xe, đăng kiểm xe, báo giá xe, giấy khai sinh không có trường valid và trường invalidMessage.

Trong trường hợp trích xuất thông tin từ file PDF hoặc nhiều loại giấy tờ trong một ảnh, trường data sẽ là 1 list các phần tử có các trường ở trên.

Trong trường hợp trích xuất thông tin từ văn bản scan, trường data sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của 1 trang trong file pdf hoặc của 1 ảnh. Mỗi phần tử trong list này được biểu thị như sau:

```javascript
[
  // list các block trong cùng một trang
  [
    // list các line trong cùng một block
    [
      // list các text trong cùng một line (*)
    ],
  ],
];
```

Mỗi phần tử text (\*) bao gồm các trường sau:

```javascript
{
  "text": string, // nội dung của text
  "confidence": float, // độ tin cậy của text
  "box": {
    "left": int, // tọa độ bên trái của text
    "right": int, // tọa độ bên phải của text
    "top": int, // tọa độ bên trên của text
    "bottom": int // tọa độ bên dưới của text
  }
}
```

Trong trường hợp trích xuất thông tin dạng bảng, trường data sẽ là một list, mỗi phần tử trong list sẽ tương ứng với thông tin của một bảng. Mỗi phần tử gồm các trường:

- image: ảnh bảng đã được cắt và căn chỉnh
- info: thông tin bảng, trường này là một list, mỗi phần tử trong list tương ứng thông tin của một hàng

Ví dụ:

```javascript
{
  "data": [
    {
      "info": [
        ["3", "Liti", "Li"],
        ["4", "Beri", "Be"],
        ["5", "Bo", "B"]
      ],
      "image": "<base64_img1>"
    },
    {
      "info": [
        ["Column1", "column2"],
        ["1", "2"],
        ["1", "1"]
      ],
      "image": "<base64_img2>"
    }
  ]
}
```

Giấy chứng nhận đăng ký doanh nghiệp:

- company_name: tên doanh nghiệp
- english_name: tên nước ngoài
- short_name: tên viết tắt
- business_code: mã số doanh nghiệp
- regis_date: ngày đăng ký
- date_of_change: ngày thay đổi
- address: địa chỉ
- company_phone: điện thoại
- fax: fax
- email: email
- website: website
- authorized_capital: vốn điều lệ
- par_value: mệnh giá cổ phần
- total_shares: tổng số cổ phần
- representative_name: họ tên người đại diện
- representative_title: chức danh người đại diện
- gender: giới tính
- dob: ngày sinh
- ethnicity: dân tộc
- nationality: quốc tịch
- document_type: loại giấy tờ
- number_of_idcard: số cmt
- issue_date: ngày cấp
- issued_at: nơi cấp
- household_address: địa chỉ hộ khẩu
- representative_address: nơi ở hiện tại
- company_name_box: tọa độ tên doanh nghiệp là một list gồm [left, top, right, bottom]
- english_name_box: tọa độ tên nước ngoài là một list gồm [left, top, right, bottom]
- short_name_box: tọa độ tên viết tắt là một list gồm [left, top, right, bottom]
- business_code_box: tọa độ mã số doanh nghiệp là một list gồm [left, top, right, bottom]
- regis_date_box: tọa độ ngày đăng ký là một list gồm [left, top, right, bottom]
- date_of_change_box: tọa độ ngày thay đổi là một list gồm [left, top, right, bottom]
- address_box: tọa độ địa chỉ là một list gồm [left, top, right, bottom]
- company_phone_box: tọa độ điện thoại là một list gồm [left, top, right, bottom]
- fax_box: tọa độ fax là một list gồm [left, top, right, bottom]
- email_box: tọa độ email là một list gồm [left, top, right, bottom]
- website_box: tọa độ website là một list gồm [left, top, right, bottom]
- authorized_capital_box: tọa độ vốn điều lệ là một list gồm [left, top, right, bottom]
- par_value_box: tọa độ mệnh giá cổ phần là một list gồm [left, top, right, bottom]
- total_shares_box: tọa độ tổng số cổ phần là một list gồm [left, top, right, bottom]
- representative_name_box: tọa độ họ tên người đại diện là một list gồm [left, top, right, bottom]
- representative_title_box: tọa độ chức danh người đại diện là một list gồm [left, top, right, bottom]
- gender_box: tọa độ giới tính là một list gồm [left, top, right, bottom]
- dob_box: tọa độ ngày sinh là một list gồm [left, top, right, bottom]
- ethnicity_box: tọa độ dân tộc là một list gồm [left, top, right, bottom]
- nationality_box: tọa độ quốc tịch là một list gồm [left, top, right, bottom]
- document_type_box: tọa độ loại giấy tờ là một list gồm [left, top, right, bottom]
- number_of_idcard_box: tọa độ số cmt là một list gồm [left, top, right, bottom]
- issue_date_box: tọa độ ngày cấp là một list gồm [left, top, right, bottom]
- issued_at_box: tọa độ nơi cấp là một list gồm [left, top, right, bottom]
- household_address_box: tọa độ địa chỉ hộ khẩu là một list gồm [left, top, right, bottom]
- representative_address_box: tọa độ nơi ở hiện tại là một list gồm [left, top, right, bottom]
- company_name_confidence: độ tin cậy tên doanh nghiệp
- english_name_confidence: độ tin cậy tên nước ngoài
- short_name_confidence: độ tin cậy tên viết tắt
- business_code_confidence: độ tin cậy mã số doanh nghiệp
- regis_date_confidence: độ tin cậy ngày đăng ký
- date_of_change_confidence: độ tin cậy ngày thay đổi
- address_confidence: độ tin cậy địa chỉ
- company_phone_confidence: độ tin cậy điện thoại
- fax_confidence: độ tin cậy fax
- email_confidence: độ tin cậy email
- website_confidence: độ tin cậy website
- authorized_capital_confidence: độ tin cậy vốn điều lệ
- par_value_confidence: độ tin cậy mệnh giá cổ phần
- total_shares_confidence: độ tin cậy tổng số cổ phần
- representative_name_confidence: độ tin cậy họ tên người đại diện
- representative_title_confidence: độ tin cậy chức danh người đại diện
- gender_confidence: độ tin cậy giới tính
- dob_confidence: độ tin cậy ngày sinh
- ethnicity_confidence: độ tin cậy dân tộc
- nationality_confidence: độ tin cậy quốc tịch
- document_type_confidence: độ tin cậy loại giấy tờ
- number_of_idcard_confidence: độ tin cậy số cmt
- issue_date_confidence: độ tin cậy ngày cấp
- issued_at_confidence: độ tin cậy nơi cấp
- household_address_confidence: độ tin cậy địa chỉ hộ khẩu
- representative_address_confidence: độ tin cậy nơi ở hiện tại
- image: ảnh giấy đăng ký kinh doanh đã quay và căn chỉnh

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | So khớp thành công                                                   |
| 1      | The photo does not contain content | Upload ảnh bị lỗi khi dùng POST                                      |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Tồn tại ảnh không có mặt người                                       |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã lỗi cảnh báo:

| invalidCode | invalidMessage                                                   | Mô tả                                                                              |
| ----------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 0           | Successful                                                       | Thành công                                                                         |
| 1           | The ID card photo is not existed                                 | Ảnh đầu vào không có giấy tờ tùy thân                                              |
| 2           | The picture is a photocopy version of the id card                | Ảnh giấy tờ tùy thân là bản photocopy                                              |
| 3           | The ID card photo is suspected of tampering                      | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo                                           |
| 4           | The ID card photo does not contain a face                        | Ảnh giấy tờ tùy thân không có mặt                                                  |
| 5           | The portrait photo does not contain a face                       | Ảnh chân dung không có mặt                                                         |
| 6           | Photo contains more than one face                                | Ảnh chứa nhiều hơn một mặt người                                                   |
| 7           | Wearing sunglasses                                               | Đeo kính đen                                                                       |
| 8           | Wearing a hat                                                    | Đội mũ                                                                             |
| 9           | Wearing a mask                                                   | Đeo khẩu trang                                                                     |
| 10          | Photo taken from picture, screen, blurred noise or sign of fraud | Ảnh chụp từ bức ảnh khác, màn hình thiết bị, bị mờ nhiễu hoặc có dấu hiệu gian lận |
| 11          | The face in the picture is too small                             | Mặt người trong ảnh quá nhỏ                                                        |
| 12          | The face in the portrait photo is too close to the margin        | Mặt người trong ảnh quá gần với lề                                                 |
