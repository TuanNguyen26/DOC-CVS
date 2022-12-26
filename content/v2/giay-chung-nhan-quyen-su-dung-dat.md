---
title: 'Giấy chứng nhận quyền sử dụng đất'
metaTitle: 'Giấy chứng nhận quyền sử dụng đất'
metaDescription: 'This is the api v2 for this page'
stt: 18
---

#### 1. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào url của ảnh hoặc pdf

**API**:

| Method | URL                                                                       |
| ------ | ------------------------------------------------------------------------- |
| GET    | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` |

**Params**:

| Key           | Value                           | Mô tả                                                              |
| ------------- | ------------------------------- | ------------------------------------------------------------------ |
| `img`         | `https://example.com/image.png` | Url của ảnh hoặc pdf                                               |
| `format_type` | `url`                           | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false`                  | Trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

image_url = 'https://example.com/image.png'

response = requests.get(
  "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?img=%s&format_type=url&get_thumb=false"
  % image_url,
  auth=(api_key, api_secret))

print(response.json())

```

#### 2. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào file ảnh hoặc file pdf

**API**:

| Method | URL                                                                       | content-type          |
| ------ | ------------------------------------------------------------------------- | --------------------- |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` | `multipart/form-data` |

**Params**:

| Key           | Value          | Mô tả                                                              |
| ------------- | -------------- | ------------------------------------------------------------------ |
| `format_type` | `file`         | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

**Body**:

| Key   | Type   | Value         | Mô tả                                                   |
| ----- | ------ | ------------- | ------------------------------------------------------- |
| `img` | `file` | `example.jpg` | File ảnh hoặc pdf của Giấy chứng nhận quyền sử dụng đất |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
image_path = '/path/to/your/image.jpg'

response = requests.post(
  "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?format_type=file&get_thumb=false",
  auth=(api_key, api_secret),
  files={'img': open(image_path, 'rb')})

print(response.json())

```

#### 3. Trích xuất thông tin Giấy chứng nhận quyền sử dụng đất với đầu vào json

**API**:

| Method | URL                                                                       | content-type       |
| ------ | ------------------------------------------------------------------------- | ------------------ |
| POST   | `https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate` | `application/json` |

**Params**:

| Key           | Value          | Mô tả                                                              |
| ------------- | -------------- | ------------------------------------------------------------------ |
| `format_type` | `base64`       | Loại data truyền vào, nhận giá trị: `url`, `file`, `base64`        |
| `get_thumb`   | `true`/`false` | Trả về ảnh của Giấy chứng nhận quyền sử dụng đất đã được căn chỉnh |

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
    "https://demo.computervision.com.vn/api/v2/ocr/document/land_certificate?format_type=base64&get_thumb=false",
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
    "type": string, // loại của giấy chứng nhận
  },
  "errorCode": string, // mã lỗi
  "errorMessage": string // thông báo lỗi
}
```

Loại 1:

`type`: `giay_cnqshdd_mau_1`. Giấy chứng nhận quyền sử dụng đất quyền sở hữu nhà ở và tài sản khác gắn liền với đất.

`info` : Bao gồm các thông tin sau:

- `so_so` : Số sổ của giấy chứng nhận
- `noi_cap` : Nơi cấp của giấy chứng nhận
- `ngay_cap` : Ngày cấp của giấy chứng nhận
- `so_vao_so` : Số vào sổ cấp GCN
- `thong_tin_thua_dat` : Thông tin của thửa đất
- `thong_tin_nha_o` : Thông tin của nhà ở
- `thong_tin_ghi_chu` : Thông tin ghi chú
- `list_img` : Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat` : Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten` : Họ tên của chủ đất
  - `nam_sinh` : Năm sinh của chủ đất
  - `so_cmt` : Số cmnd, hộ chiếu của chủ đất
  - `dia_chi` : Địa chỉ thường trú của chủ đất

Loại 2:

`type` : `giay_cnqshdd_mau_2`. Giấy chứng nhận quyền sử dụng đất.

`info` : Bao gồm các thông tin sau:

- `so_so` : Số sổ của giấy chứng nhận
- `noi_cap` : Nơi cấp của giấy chứng nhận
- `ngay_cap` : Ngày cấp của giấy chứng nhận
- `so_vao_so` : Số vào sổ cấp GCN
- `dia_chi_thua_dat` : Địa chỉ của thửa đất
- `thong_tin_thua_dat` : Thông tin của thửa đất
- `list_img` : Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat` : Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten` : Họ tên của chủ đất
  - `nam_sinh` : Năm sinh của chủ đất
  - `so_cmt` : Số cmnd, hộ chiếu của chủ đất
  - `dia_chi` : Địa chỉ thường trú của chủ đất

Loại 3:

`type`: `giay_cnqshdd_mau_3`. Giấy chứng nhận quyền sở hữu nhà ở và quyền sử dụng đất ở.

`info` : Bao gồm các thông tin sau:

- `so_so` : Số sổ của giấy chứng nhận
- `noi_cap` : Nơi cấp của giấy chứng nhận
- `ngay_cap` : Ngày cấp của giấy chứng nhận
- `so_vao_so` : Số vào sổ cấp GCN
- `thong_tin_thua_dat` : Thông tin của thửa đất
- `list_img` : Danh sách ảnh trả về dạng base64
- `noi_dung_chu_dat` : Nội dung của chủ đất. Là một list, mỗi phần tử trong list gồm các thông tin sau:
  - `ten` : Họ tên của chủ đất
  - `nam_sinh` : Năm sinh của chủ đất
  - `so_cmt` : Số cmnd, hộ chiếu của chủ đất
  - `dia_chi` : Địa chỉ thường trú của chủ đất

_Lưu ý_: Các trường thông tin (trừ trường `list_img` và `noi_dung_chu_dat`) sẽ có thêm trường `_box`, `_confidence`, `_id` đi kèm. Trong đó:

- `_id` : Thông tin được lấy thuộc trang thứ bao nhiêu trong list ảnh của trường `list_img`, index bắt đầu từ 0.
- `_box` : Tọa độ đi kèm [left, top, right, bottom].
- `_confidence` : Độ tin cậy đi kèm.
