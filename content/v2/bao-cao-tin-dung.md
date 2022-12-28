---
title: 'Báo cáo tín dụng '
metaTitle: 'Báo cáo tín dụng'
metaDescription: 'This is the api v2 for this page'
stt: 22
---

#### 1. Trích xuất thông tin Báo cáo tín dụng với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                    |
| ------ | ---------------------------------------------------------------------- |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` |

**Params**:

| Key           | Value                           | Mô tả                                                       |
| ------------- | ------------------------------- | ----------------------------------------------------------- |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                        |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Báo cáo tín dụng với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                    | content-type          |
| ------ | ---------------------------------------------------------------------- | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

**Body**:

| Key   | Type   | Value         | Mô tả                                  |
| ----- | ------ | ------------- | -------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc pdf của Báo cáo tín dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Báo cáo tín dụng với đầu vào json

**API**:

| Method | URL                                                                    | content-type       |
| ------ | ---------------------------------------------------------------------- | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/credit_report` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Báo cáo tín dụng đã được căn chỉnh           |

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
    "https://demo.computervision.com.vn/api/v2/ocr/document/credit_report?format_type=base64&get_thumb=false",
    auth=(api_key, api_secret),
    json={'img' : encode_cmt})
print(response.json())
```

#### 4. Thông tin trả về

Thông tin trả về là một JSON với định dạng sau:

```json
{
  "data": {
    "info": [xxxx],
    "type": "credit_report"
  },
  "errorCode": string, // Mã lỗi
  "errorMessage": string // Thông báo lỗi
}
```

`info`: Thông tin trích xuất được, bao gồm:

- `report_time`: Thời gian gửi báo cáo.
- `report_time_box`: Tọa độ thời gian gửi báo cáo là một list gồm [left, top, right, bottom].
- `report_time_confidence`: Độ tin cậy Thời gian gửi báo cáo.
- `report_time_id`: Trang đi kèm với Thời gian gửi báo cáo.
- `cic_code`: Mã số CIC.
- `cic_code_box`: Tọa độ Mã số CIC là một list gồm [left, top, right, bottom].
- `cic_code_confidence`: Độ tin cậy Mã số CIC
- `cic_code_id`: Trang đi kèm với Mã số CIC
- `id_card`: Số chứng minh nhân dân
- `id_card_box`: Tọa độ Số chứng minh nhân dân là một list gồm [left, top, right, bottom].
- `id_card_confidence`: Độ tin cậy Số chứng minh nhân dân
- `id_card_id`: Trang đi kèm với Số chứng minh nhân dân
- `address`: Địa chỉ
- `address_box`: Tọa độ Địa chỉ là một list gồm [left, top, right, bottom].
- `address_confidence`: Độ tin cậy Địa chỉ
- `address_id`: Trang đi kèm với Địa chỉ
- `credit_score`: Điểm tín dụng
- `credit_score_box`: Tọa độ Điểm tín dụng là một list gồm [left, top, right, bottom].
- `credit_score_confidence`: Độ tin cậy Điểm tín dụng
- `credit_score_id`: Trang đi kèm với Điểm tín dụng
- `credit_rank`: Hạng tín dụng
- `credit_rank_box`: Tọa độ Hạng tín dụng là một list gồm [left, top, right, bottom].
- `credit_rank_confidence`: Độ tin cậy Hạng tín dụng
- `credit_rank_id`: Trang đi kèm với Hạng tín dụng
- `credit_ranking_date`: Ngày chấm điểm
- `credit_ranking_date_box`: Tọa độ Ngày chấm điểm là một list gồm [left, top, right, bottom].
- `credit_ranking_date_confidence`: Độ tin cậy Ngày chấm điểm
- `credit_ranking_date_id`: Trang đi kèm với Ngày chấm điểm
- `debt_sold_to_vamc`: Dư nợ đã bán vamc
- `debt_sold_to_vamc_box`: Tọa độ Dư nợ đã bán vamc là một list gồm [left, top, right, bottom].
- `debt_sold_to_vamc_confidence`: Độ tin cậy Dư nợ đã bán vamc
- `debt_sold_to_vamc_id`: Trang đi kèm với Dư nợ đã bán vamc
- `imgs`: List ảnh dạng base64 chứa thông tin
- `loan_details`: Chi tiết dư nợ vay. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2, json3, json4]`. Trong đó:
  - `json0`: Số thứ tự tổ chức tín dụng
  - `json1`: Mã tổ chức tín dụng
  - `json2`: Tên tổ chức tín dụng
  - `json3`: Loại dư nợ và số tiền
  - `json4`: Tổng cộng VND

`json0`,`json1`,`json2`,`json4` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

`json3` có định dạng:

```json
{
  "value": [
    {
      "debt_name": string, // Tên loại dư nợ
      "debt": string, // Số tiền dư nợ tương ứng với loại dư nợ
    },
    ...
  ],
  "box": [array, ...],  // List vị trí tương ứng với mỗi value
  "score": [float, ...], // List độ tin cậy tương ứng với mỗi value
}
```

- `loan_details_image` : Ảnh base64 của chi tiết dư nợ vay
- `credit_card_info` : Chi tiết thẻ tín dụng và dư nợ thẻ tín dụng. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2, json3]`. Trong đó:
  - `json0` : Tổng hạn mức thẻ tín dụng
  - `json1` : Số tiền phải thanh toán thẻ
  - `json2` : Tổng số tiền chậm thanh toán thẻ
  - `json3` : Số lượng thẻ tín dụng

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `credit_card_info_image` : Ảnh base64 của thông tin thẻ tín dụng và dư nợ thẻ tín dụng
- `outstanding_loans` : Diễn biến dư nợ 12 tháng gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0` : Dư nợ vay
  - `json1` : Dư nợ thẻ
  - `json2` : Tổng dư nợ

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `outstanding_loans_image` : Ảnh base64 của diễn biến dư nợ 12 tháng gần nhất
- `bad_debt` : Lịch sử nợ xấu tín dụng trong 5 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0` : Ngày phát sinh cuối cùng
  - `json1` : Nhóm nợ
  - `json2` : Số tiền VND
  - `json3` : Số thứ tự
  - `json4` : Tên tổ chức/chi nhánh tổ chức tín dụng

`json0`,`json1`,`json2`,`json3`,`json4` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `bad_debt_image`: Ảnh base64 tương ứng với lịch sử nợ xấu tín dụng trong 5 năm gần nhất
- `late_payments`: Lịch sử chậm thanh toán thẻ tín dụng trong 3 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0` : Khách hàng có chậm thanh toán thẻ (Y/N)
  - `json1` : Số ngày chậm thanh toán thẻ lớn nhất
  - `json2` : Số lần chậm thanh toán thẻ

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `late_payments_image` : Ảnh base64 tương ứng với lịch sử chậm thanh toán thẻ tín dụng trong 3 năm gần nhất
- `loan_guarantee` : Thông tin về đảm bảo tiền vay. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1]`. Trong đó:
  - `json0` : Số lượng tài sản bảo đảm
  - `json1` : Số TCTD có tài sản bảo đảm

`json0`,`json1` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `loan_guarantee_image`: Ảnh base64 tương ứng với thông tin về đảm bảo tiền vay
- `credit_contract`: Thông tin về hợp đồng tín dụng. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1]`. Trong đó:
  - `json0`: Ngày ký hợp đồng
  - `json1`: Ngày kết thúc hợp đồng

`json0`,`json1` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `credit_contract_image`: Ảnh base64 tương ứng với thông tin về hợp đồng tín dụng
- `customers_look_up`: Danh sách TCTD tra cứu về khách hàng trong 1 năm gần nhất. Là một list, mỗi phần tử trong list tương ứng với thông tin của 1 hàng có định dạng: `[json0, json1, json2]`. Trong đó:
  - `json0`: Mã TCTD
  - `json1`: Sản phẩm tra cứu
  - `json2`: Ngày tra cứu

`json0`,`json1`,`json2` đều có định dạng:

```json
{
  "value": string, // Giá trị text
  "box": array,  // Vị trí của text trong ảnh
  "score": float, // Độ tin cậy của text
}
```

- `customers_look_up_image`: Ảnh base64 tương ứng với danh sách TCTD tra cứu về khách hàng trong 1 năm gần nhất
