시작
==

**utils.js 파일을 받아서 head 부분에 작성하시면 됩니다.**

Number, Boolean, String, Array 타입 지원  
Object 타입은 타 라이브러리에 오류가 있어 지원 불가능  
Prototype 형태로 제작되어 있으므로, 바로 사용 가능합니다.

```
<script type="text/javascript" src="utils.js">
let a = [10, 20, 30, 40];
document.write(a.sum()); // 100
let b = [20, 50, 0, 5];
document.write(a.add(b).toStringEx()); // [30, 70, 30, 45]
</script>
```

데이터 타입
==

**기본형** : Number, Boolean, String, Array  
**결측치** : NA

이항 연산
==

* 정수 리터럴은, `..` 으로 작성 (괄호 묶인 경우 등 제외)
* 그 외 : `.`으로 작성


|연산 |  설명|예제|
|---|---|---|
|add|덧셈|10..add(20) = 30|
|sub|뺄셈|70..sub(20) = 50|
|mul|곱셈|20..mul(5) = 100|
|div|나눗셈|18..div(4) = 4.5|
|idiv|나눗셈 몫|18..idiv(4) = 4|
|mod|나눈 나머지|18..mod(4) = 2|
|dm|몫과 나머지를 배열로|18..dm(4) = [4, 2]|
|pow|거듭제곱|3..pow(4) = 81|
|root|N제곱근|(-32).root(5) = -2|
|logBase|밑이 주어진 로그|625..logBase(5) = 4|
|abSub|뺄셈 절댓값|100..abSub(130) = 30|
|sqSub|뺄셈 제곱|100..sqSub(130) = 900|
|hAbSub|뺄셈 절댓값 절반|100.hAbSub(130) = 15|
|center|등차중항|20..center(80) = 50|
|gcenter|등비중항|20..gcenter(80) = 40|
|hcenter|조화중항|20..hcenter(80) = 32|
|delta|증감률|500..delta(600) = 0.2|
|atan2|역탄젠트|5..atan2(3) = 1.0303768265243125|
|hypot|빝변 계산|3..hypot(4) = 5|

배열 내부 연산
==

```
document.write([10, 20, 30].add()); // 10 + 20 + 30 = 60
document.write([100, 20, 30].sub()); // 100 - 20 - 30 = 50
```

배열 간 연산
==

```
document.write([10, 20, 30].add([40, 50, 80])); // [10+40, 20+50, 30+80] = [50, 70, 110]
```

스칼라 연산
==
``
document.write([10, 20, 30].add(5)); // [10+5, 20+5, 30+5] = [15, 25, 35]
``



