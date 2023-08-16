import { readQuery } from '@/db/mysql/query/crud';
import {Read as readUser} from '@/models/user';
import { buildConditionQuery } from '@/lib/queryBuilder';
import { createCanvas, loadImage } from 'canvas';


// registerFont('public/VarelaRound-Regular.ttf', { family: 'VarelaRound' });

function formatDate(dateString : string) {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default async (contract_id : Number | BigInt) => {
    const image = await loadImage('public/contractForm.png'); // 이미지 로드
    const canvas = createCanvas(image.width, image.height);
    console.log(image.width, image.height); //866 1047
    const context = canvas.getContext('2d');

    // 로드한 이미지를 캔버스에 그림
    context.drawImage(image, 0, 0, image.width, image.height);

    // 텍스트 설정
    const {conditionQuery, values} = buildConditionQuery({id : contract_id}, ' AND ');
    const [result] : contract[]= await readQuery('History', {conditionQuery, values});

    if (!result) {return {message : "No Contract found"};}
    const [producer] : member[] = await readUser({id : result.producer_id});
    const [consumer] : member[] = await readUser({id : result.consumer_id});

    context.font = '30px "Noto Sans KR"';
    context.fillStyle = '#000000';
    const pd_name = producer.name;
    const cs_name = consumer.name

    // 제공자, //대여자
    context.fillText(pd_name, 215, 130); // 원하는 위치에 텍스트 그리기
    context.fillText(cs_name, 605, 130);

    // 제품명
    context.fillText(result.productName, 223, 282);
    
    // 계약기간
    context.font = '25px "Noto Sans KR"';
    const rental_at = formatDate(result.rental_at);
    const metrics_rental = context.measureText(rental_at);
    const textWidth_rental = metrics_rental.width;


    context.fillText(rental_at, 200, 344);
    context.fillText('~', 200 + textWidth_rental + 10, 344);
    context.fillText(formatDate(result.return_at), 200 + textWidth_rental + 10 + 30, 344);
    context.fillText(`[${result.period} 일]`, image.width - 150, 344);

    //대여료
    context.font = '30px "Noto Sans KR"';
    const rental_cost = `${result.rental_cost}`;
    const metrics_rt = context.measureText(rental_cost);
    const textWidth_rt = metrics_rt.width;
    context.fillText(rental_cost, 530 - textWidth_rt, 405);

    // 보증금
    const deposit = `${result.deposit}`;
    const metrics_dp = context.measureText(deposit);
    const textWidth_dp = metrics_dp.width;
    context.fillText(deposit, 530 - textWidth_dp, 465);


    // 계좌번호
    context.fillText(result.account, 350, 615);

    // 납부금액
    const pay = `${Number(result.rental_cost) * Number(result.period) + Number(result.deposit)}`;
    const metrics_pay = context.measureText(pay);
    const textWidth_pay = metrics_pay.width;
    context.fillText(pay, 490 - textWidth_pay, 675);

    // 제공자 서명
    const metrics_pd = context.measureText(pd_name);
    const textWidth_pd = metrics_pd.width;
    context.fillText(pd_name, 210 - textWidth_pd, 896);
    const producer_sign = await loadImage(result.producer_sign);
    context.drawImage(producer_sign, 220, 850, producer_sign.width, producer_sign.height);

    // 이용자 서명
    const metrics_cs = context.measureText(cs_name);
    const textWidth_cs = metrics_cs.width;
    context.fillText(cs_name, 550 - textWidth_cs, 896);
    const consumer_sign = await loadImage(result.consumer_sign);
    context.drawImage(producer_sign, 560, 850, consumer_sign.width, consumer_sign.height);

    // 계약 일시
    const created_at = formatDate(result.created_at);
    const metrics_created = context.measureText(created_at);
    const textWidth_created = metrics_created.width;
    context.fillText(formatDate(result.created_at), 800 - textWidth_created, 1000);

    // Canvas를 이미지로 변환
    const imageBuffer = canvas.toBuffer('image/png');

    return imageBuffer;

};