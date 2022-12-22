---
title: 'Phân loại giấy tờ, hồ sơ bảo hiểm sức khỏe'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v2 for this page'
id: 13
---

#### 1. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                      |
| ------ | ------------------------------------------------------------------------ |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh đã được căn chỉnh                                |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                      | content-type          |
| ------ | ------------------------------------------------------------------------ | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đã được căn chỉnh                                |

**Body**:

| Key   | Type | Value         | Mô tả                                         |
| ----- | ---- | ------------- | --------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc pdf của Hồ sơ bảo hiểm sức khỏe |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Phân loại giấy tờ hồ sơ bảo hiểm sức khỏe với đầu vào json

**API**:

| Method | URL                                                                      | content-type       |
| ------ | ------------------------------------------------------------------------ | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh đã được căn chỉnh                                |

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
    "https://demo.computervision.com.vn/api/v2/ocr/document/get_label_claim?format_type=base64&get_thumb=false",
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

Mỗi phần tử trong mảng `data` (tương ứng với từng trang được trích xuất) sẽ là một JSON với định dạng sau:

```json
{
  "id": [xxxx],
  "label": [xxxx],
  "image": [xxxx]
}
```

Trong đó:

- `id`: Thứ tự trang tương ứng với file truyền vào, bắt đầu từ 0.
- `label`: Nhãn của trang tương ứng. Hiện tại đã hỗ trợ 17 nhãn trong hồ sơ bảo hiểm, nếu rơi vào trường hợp không thuộc 1 trong 17 nhãn đã định nghĩa thì `label` sẽ trả về `None`.
  - `invoice`: Hóa đơn
  - `list_expense`: Bảng kê
  - `claim_form`: Giấy yêu cầu bồi thường
  - `hospital_discharge_paper`: Giấy ra viện
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
- `image`: Ảnh được căn chỉnh với trang tương ứng
