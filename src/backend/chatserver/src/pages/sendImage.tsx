import { useS3Upload } from "next-s3-upload";

export default function UploadPage() {
  let { uploadToS3 } = useS3Upload();

  let handleFileChange = async (event : any) => {
    let file = event.target.files[0];
    console.log("이미지", file)
    let { url } = await uploadToS3(file);

    console.log("Successfully uploaded to S3!", url);
  };

  function payment() {
    var url = 'https://developers.kakao.com/demo/pay/prepare'
    var params = {
        agent: 'web',
        itemCode: '1',
        quantity: '5',
    }
    return url + '?' + '1regjlenrgqlhsajkd'
}

  return (
    <>
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
    <a href={payment()}>안녕하세용</a>
    </>
  );
}
