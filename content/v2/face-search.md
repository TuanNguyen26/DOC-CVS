---
title: 'Face Search'
metaTitle: 'Face Search'
metaDescription: 'This is the api v2 for this page'
stt: 16
---

#### 1. Xem toàn bộ ảnh

**API**:

| Method | URL                                                             |
| ------ | --------------------------------------------------------------- |
| GET    | `https://cloud.computervision.com.vn/api/v2/face_search/images` |

**Params**:

| Key      | Value | Mô tả                       |
| -------- | ----- | --------------------------- |
| `offset` | `100` | Số bản ghi sẽ bỏ qua        |
| `limit`  | `50`  | Số bản ghi tối đa sẽ trả về |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'

offset = 100
limit = 50

response = requests.get(
  "https://cloud.computervision.com.vn/api/v2/face_search/images?offset=%s&limit=%s"
  % (offset, limit),
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 2. Tìm kiếm khuôn mặt

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/face_search/search` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string // Mã hóa base64 của hình ảnh
  }
}
```

Trong đó:

| Key      | Type        | Bắt buộc | Mô tả                      |
| -------- | ----------- | -------- | -------------------------- |
| `image`  | `ImageData` | Có       | Ảnh dùng để tìm kiếm       |
| `base64` | `string`    | Có       | Mã hoá base64 của hình ảnh |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/search",
  auth=(api_key, api_secret),
  data = payload

print(response.json())
```

#### 3. Thêm ảnh

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| POST   | `https://cloud.computervision.com.vn/api/v2/face_search/images` | `application/json` |

**Body**:

```json
{
  "image": {
    "base64": string // mã hóa base64 của hình ảnh,
    "metadata": json //bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key "user", "encoding", "_id" đã được hệ thống sử dụng
  }
}
```

Trong đó:

| Key        | Type         | Bắt buộc | Mô tả                                                                                                                     |
| ---------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `image`    | `ImageData`  | Có       | Ảnh muốn thêm                                                                                                             |
| `base64`   | `string`     | Có       | Mã hoá base64 của hình ảnh                                                                                                |
| `metadata` | `dictionary` | Không    | Bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key `"user"`, `"encoding"`, `"_id"` đã được hệ thống sử dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image\":{\"base64\":\"iVBORw0KGgoAAAANSU...\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images",
    auth=(api_key, api_secret),
    data = payload

print(response.json())
```

#### 4. Cập nhật metadata

**API**:

| Method | URL                                                                        | content-type       |
| ------ | -------------------------------------------------------------------------- | ------------------ |
| PUT    | `https://cloud.computervision.com.vn/api/v2/face_search/images/<image_id>` | `application/json` |

**Body**:

```json
{
  "image_id": 123456,
  "metadata": {
    "name": "example",
    "label": "for bar"
    ...
  }
}
```

| Key        | Bắt buộc | Mô tả                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `metadata` | Không    | Bất kỳ metadata key-value nào để lưu cùng với ảnh, trừ những key `"user"`, `"encoding"`, `"_id"` đã được hệ thống sử dụng |

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"image_id\":123456,\"metadata\":{\"name\":\"example\",\"label\":\"for bar\"}}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images/<image_id>",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 5. Xoá nhiều ảnh

**API**:

| Method | URL                                                             | content-type       |
| ------ | --------------------------------------------------------------- | ------------------ |
| DELETE | `https://cloud.computervision.com.vn/api/v2/face_search/images` | `application/json` |

**Body**:

```json
{
  "ids": [
    123456, // id ảnh cần xoá
    987654, // id ảnh cần xoá
    ...
  ]
}
```

**Demo Python**:

```python
import requests

api_key = '<replace-with-your-api-key>'
api_secret = '<replace-with-your-api-secret>'
payload = "{\"ids\":[<image-id-you-want-to-delete>,<image-id-you-want-to-delete>,...]}"

response = requests.post(
  "https://cloud.computervision.com.vn/api/v2/face_search/images",
  data = payload,
  auth = (api_key, api_secret)
)

print(response.json())

```

#### 6. Thông tin trả về

Phản hồi sẽ là một JSON với định dạng sau:

```json
{
  "result": [xxxx],
  "status_code": int, // Mã lỗi
  "message": string, // Thông báo lỗi
}
```

Mỗi api khác nhau sẽ trả về kết quả khác nhau.

Xem toàn bộ ảnh:

- `result` : Mảng chứa các phần tử ảnh, mỗi phần tử gồm id của ảnh và url ảnh tương ứng

Tìm kiếm khuôn mặt:

- `result` : Mảng chứa các phần tử ảnh phù hợp, mỗi phần tử gồm id của ảnh và url ảnh tương ứng

Thêm ảnh:

- `result` : Json chứa thông tin ảnh mới được thêm vào

Xoá nhiều ảnh:

- `result` : None

Bảng mã lỗi:

| Mã lỗi | Message                            | Mô tả                                                                |
| ------ | ---------------------------------- | -------------------------------------------------------------------- |
| 0      | Success                            | So khớp thành công                                                   |
| 1      | The photo does not contain content | Upload ảnh bị lỗi khi dùng POST                                      |
| 2      | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3      | Incorrect image formatt            | Tồn tại ảnh không có mặt người                                       |
| 4      | Out of requests                    | Hết số lượng request                                                 |
| 5      | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6      | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |

Bảng mã lỗi:

| invalidCode | invalidMessage                     | Mô tả                                                                |
| ----------- | ---------------------------------- | -------------------------------------------------------------------- |
| 0           | Successful                         | So khớp thành công                                                   |
| 1           | The photo does not contain content | Upload ảnh bị lỗi khi dùng POST                                      |
| 2           | Url is unavailable                 | Download ảnh bị lỗi khi dùng GET                                     |
| 3           | Incorrect image format             | Tồn tại ảnh không có mặt người                                       |
| 4           | Out of requests                    | Hết số lượng request                                                 |
| 5           | Incorrect Api_key or api_secret    | Khi api_key hoặc api_secret sai                                      |
| 6           | Incorrect format type              | Loại format khai báo trong format_type không đúng với ảnh truyền vào |
