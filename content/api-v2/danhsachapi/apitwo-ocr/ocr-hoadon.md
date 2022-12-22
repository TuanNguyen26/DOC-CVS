---
title: 'Hóa đơn'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
id: 24
metaDescription: 'This is the api v2 for this page'
---

#### 1. Trích xuất thông tin hóa đơn với đầu vào url ảnh hoặc pdf

**API**:

| Method | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin hóa đơn với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

**Body**:

| Key   | Type | Value         | Mô tả                                                   |
| ----- | ---- | ------------- | ------------------------------------------------------- |
| `img` | file | `example.jpg` | file ảnh hoặc file pdf hóa đơn cần trích xuất thông tin |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin hóa đơn với đầu vào json

**API**:

| Method | URL                                                               | content-type       |
| ------ | ----------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh hóa đơn đã được cắt và căn chỉnh                 |

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
    "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=base64&get_thumb=false",
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

Hóa đơn: Trả về một danh sách, mỗi phần từ trong danh sách gồm

- date: ngày lập hóa đơn.
- date_box: tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- date_confidence: độ tin cậy của ngày lập hóa đơn.
- form: mẫu số.
- form_box: tọa độ mẫu số hóa đơn là danh sách gồm [left, top, right, bottom].
- form_confidence: độ tin cậy của mẫu số.
- invoice_no: số hóa đơn.
- invoice_no_box: tọa độ số hóa đơn là danh sách gồm [left, top, right, bottom].
- invoice_no_confidence: độ tin cậy của số hóa đơn.
- serial_no: số ký hiệu hóa đơn.
- serial_no_box: tọa độ số ký hiệu hóa đơn là danh sách gồm [left, top, right, bottom].
- serial_no_confidence: độ tin cậy của số ký hiệu hóa đơn.
- supplier: nhà cung cấp.
- supplier_box: tọa độ nhà cung cấp là danh sách gồm [left, top, right, bottom].
- supplier_confidence: độ tin cậy của nhà cung cấp.
- tax_code: mã số thuế nhà cung cấp.
- tax_code_box: tọa độ mã số thuế nhà cung cấp là danh sách gồm [left, top, right, bottom].
- tax_code_confidence: độ tin cậy của mã số thuế nhà cung cấp.
- total_amount: tổng tiền.
- total_amount_box: tọa độ tổng tiền là danh sách gồm [left, top, right, bottom].
- total_amount_confidence: độ tin cậy của tổng tiền.
- date: ngày lập hóa đơn.
- date_box: tọa độ ngày lập hóa đơn là danh sách gồm [left, top, right, bottom].
- date_confidence: độ tin cậy của ngày lập hóa đơn.
- info_goods: thông tin hàng hóa, dịch vụ, trường này là một danh sách, mỗi phần tử trong danh sách gồm:
- name: tên hàng hóa, dịch vụ
- coin: giá của hàng hóa, dịch vụ
- image: ảnh hóa đơn đã được xoay và căn chỉnh.

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | Trích xuất thông tin thành công                                      |
| 1      | The photo does not contain content | Ảnh đầu vào không có giấy tờ tùy thân cần trích xuất                 |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image format             | Upload ảnh bị lỗi khi dùng POST                                      |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | ncorrect format type               | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã cảnh báo:

| Mã lỗi | Message                                                         | Mô tả                                             |
| ------ | --------------------------------------------------------------- | ------------------------------------------------- |
| 0      | uccessful                                                       | Thành công                                        |
| 1      | Photo contains sign of being taken through an electronic screen | Ảnh giấy tờ tùy thân có dấu hiệu giả mạo          |
| 2      | The picture is a photocopy version of the id card               | Ảnh giấy tờ tùy thân là bản photocopy             |
| 3      | The id field on the document is incorrectly formatted           | Trường id trên giấy tờ tùy thân không đúng format |
| 4      | The mrzcode on the passport is incorrectly formatted            | MRZ code trên passport không đúng format          |
| 5      | The id card's corner has been clipped                           | Giấy tờ tùy thân bị cắt góc                       |
