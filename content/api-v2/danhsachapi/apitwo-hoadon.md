---
title: 'Hóa đơn'
metaTitle: 'Tài liệu hướng dẫn tích hợp API Computer Vision VietNam'
metaDescription: 'This is the api v2 for this page'
id: 8
---

#### 1. Trích xuất thông tin Hóa đơn với đầu vào file pdf

**API**:

| Method | URL                                                               | content-type          |
| ------ | ----------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hóa đơn đã được căn chỉnh                    |

**Body**:

| Key   | Type | Value         | Mô tả                |
| ----- | ---- | ------------- | -------------------- |
| `img` | file | `example.pdf` | file pdf của Hóa đơn |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/invoice.pdf'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 2. Trích xuất thông tin Hóa đơn với đầu vào file xml

**API**:

| Method | URL                                                                   | content-type          |
| ------ | --------------------------------------------------------------------- | --------------------- |
| POST   | `https://cloud.computervision.com.vn/api/v2/ocr/document/invoice-xml` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                       |
| ------------- | -------------- | ----------------------------------------------------------- |
| `format_type` | `file`         | loại data truyền vào, nhận giá trị: `url`, `file`, `base64` |
| `get_thumb`   | `true`/`false` | trả về ảnh của Hóa đơn đã được căn chỉnh                    |

**Body**:

| Key   | Type | Value         | Mô tả                |
| ----- | ---- | ------------- | -------------------- |
| `img` | file | `example.xml` | file xml của Hóa đơn |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/invoice.xml'

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/ocr/document/invoice-xml?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Thông tin trả về

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
  "info": [xxxx], // thông tin trích xuất được
  "type": "invoice"
}
```

`info` gồm các thông tin sau:

- `date`: Ngày lập hóa đơn
- `date_box`: Tọa độ ngày lập hóa đơn là một list gồm [left, top, right, bottom]
- `date_confidence`: Độ tin cậy của ngày lập hóa đơn
- `form`: Mẫu số
- `form_box`: Tọa độ mẫu số hóa đơn là một list gồm [left, top, right, bottom]
- `form_confidence`: Độ tin cậy của mẫu số
- `invoice_no`: Số hóa đơn
- `invoice_no_box`: Tọa độ số hóa đơn là một list gồm [left, top, right, bottom]
- `invoice_no_confidence`: Độ tin cậy của số hóa đơn
- `serial_no`: Số ký hiệu hóa đơn
- `serial_no_box`: Tọa độ số ký hiệu hóa đơn là một list gồm [left, top, right, bottom]
- `serial_no_confidence`: Độ tin cậy của số ký hiệu hóa đơn
- `supplier`: Nhà cung cấp
- `supplier_box`: Tọa độ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_confidence`: Độ tin cậy của nhà cung cấp
- `tax_code`: Mã số thuế nhà cung cấp
- `tax_code_box`: Tọa độ mã số thuế nhà cung cấp là một list gồm [left, top, right, bottom]
- `tax_code_confidence`: Độ tin cậy của mã số thuế nhà cung cấp
- `total_amount`: Tổng tiền
- `total_amount_box`: Tọa độ tổng tiền là một list gồm [left, top, right, bottom]
- `total_amount_confidence`: Độ tin cậy của tổng tiền
- `payment_method`: Hình thức thanh toán
- `payment_method_box`: Tọa độ hình thức thanh toán là một list gồm [left, top, right, bottom]
- `payment_method_confidence`: Độ tin cậy của hình thức thanh toán
- `sub_total`: Tiền trước thuế
- `sub_total_box`: Tọa độ tiền trước thuế là một list gồm [left, top, right, bottom]
- `sub_total_confidence`: Độ tin cậy của tiền trước thuế
- `vat_amount`: Tiền thuế
- `vat_amount_box`: Tọa độ tiền thuế là một list gồm [left, top, right, bottom]
- `vat_amount_confidence`: Độ tin cậy của tiền thuế
- `purchaser_name`: Tên đơn vị mua hàng
- `purchaser_name_box`: Tọa độ tên đơn vị mua hàng là một list gồm [left, top, right, bottom]
- `purchaser_name_confidence`: Độ tin cậy tên đơn vị mua hàng
- `lookup_website`: Đường dẫn tra cứu
- `lookup_website_box`: Tọa độ đường dẫn tra cứu là một list gồm [left, top, right, bottom]
- `lookup_website_confidence`: Độ tin cậy đường dẫn tra cứu
- `lookup_code`: Mã tra cứu,
- `lookup_code_box`: Tọa độ mã tra cứu là một list gồm [left, top, right, bottom]
- `lookup_code_confidence`: Độ tin cậy mã tra cứu
- `buyer_name`: Họ tên người mua hàng
- `buyer_name_box`: Tọa độ họ tên người mua hàng là một list gồm [left, top, right, bottom]
- `buyer_name_confidence`: Độ tin cậy họ tên người mua hàng
- `supplier_address`: Địa chỉ nhà cung cấp
- `supplier_address_box`: Tọa độ địa chỉ nhà cung cấp là một list gồm [left, top, right, bottom]
- `supplier_address_confidence`: Độ tin cậy địa chỉ nhà cung cấp
- `vat_rate`: Thuế suất VAT
- `vat_rate_box`: Tọa độ thuế suất VAT là một list gồm [left, top, right, bottom]
- `vat_rate_confidence`: Độ tin cậy thuế suất VAT
- `account_bank`: Số tài khoản và ngân hàng đi kèm của nhà cung cấp. Trường này là một list. Mỗi phần tử trong list là một JSON biểu thị một số tài khoản và ngân hàng đi kèm. Phần tử này gồm các trường sau đây:
  - `account_no`: Số tài khoản
  - `account_no_box`: Tọa độ số tài khoản là một list gồm [left, top, right, bottom]
  - `account_no_confidence`: Độ tin cậy số tài khoản
  - `bank`: Tên ngân hàng
  - `bank_box`: Tọa độ tên ngân hàng là một list gồm [left, top, right, bottom]
  - `bank_confidence`: Độ tin cậy tên ngân hàng
- `image`: Ảnh hóa đơn đã được xoay và căn chỉnh
- `image_table`: Ảnh phần bảng trong hóa đơn đã được cắt và căn chỉnh
- `table`: Chứa thông tin trích xuất từ bảng. Là một list mỗi list chứa thông tin của một hàng. Mỗi phần tử trong hàng là một dictionary chứa các thông tin sau:
  - `value`: Giá trị
  - `box`: Tọa độ là một list gồm [left, top, right, bottom]
  - `score`: Độ tin cậy
  - `label`: Nhãn của cột tương ứng. Có thể là một trong các giá trị sau:
    - `number`: Số thứ tự
    - `description`: Tên hàng hóa dịch vụ
    - `unit`: Đơn vị tính
    - `quantity`: Số lượng
    - `unit_price`: Đơn giá
    - `amount_before_tax`: Tổng tiền trước thuế
    - `tax`: Thuế suất
    - `tax_amount`: Tiền thuế
    - `amount_total`: Tổng tiền sau thuế
    - `batch_no`: Số lô
    - `expired_date`: Hạn dùng
