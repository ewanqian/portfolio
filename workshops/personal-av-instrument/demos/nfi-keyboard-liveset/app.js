const app = document.querySelector('#app');
const stage = document.querySelector('#stage');
const word = document.querySelector('#word');
const subword = document.querySelector('#subword');
const keyLabel = document.querySelector('#keyLabel');
const keyboard = document.querySelector('#keyboard');
const loadState = document.querySelector('#loadState');

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const LABELS = {"Q": "叮", "W": "咚", "E": "鸡", "R": "叮", "T": "咚", "Y": "鸡", "U": "大", "I": "狗", "O": "大", "P": "狗", "A": "叫", "S": "叫", "D": "叫", "F": "叮", "G": "咚", "H": "鸡", "J": "叮", "K": "咚", "L": "鸡", "Z": "大", "X": "狗", "C": "大", "V": "狗", "B": "叫", "N": "叫", "M": "叫"};
const SLICES = {"Q": [2.68, 0.32], "W": [3.0, 0.32], "E": [3.32, 0.32], "R": [3.64, 0.3], "T": [3.94, 0.3], "Y": [4.24, 0.3], "U": [4.54, 0.24], "I": [4.78, 0.24], "O": [5.02, 0.25], "P": [5.27, 0.25], "A": [5.52, 0.29], "S": [5.81, 0.29], "D": [6.1, 0.3], "F": [10.6, 0.27], "G": [10.87, 0.27], "H": [11.14, 0.26], "J": [11.4, 0.31], "K": [11.71, 0.32], "L": [12.03, 0.32], "Z": [12.35, 0.34], "X": [12.69, 0.34], "C": [13.03, 0.35], "V": [13.38, 0.34], "B": [13.72, 0.35], "N": [14.07, 0.35], "M": [14.42, 0.36]};
const COLORS = {"叮": "#2F6BFF", "咚": "#FFD22E", "鸡": "#68D65C", "大": "#FF5B45", "狗": "#FF8A34", "叫": "#EC5CFF"};
const SOURCE_AUDIO_B64 = 'SUQzBAAAAAABSVRYWFgAAAASAAADbWFqb3JfYnJhbmQAaXNvbQBUWFhYAAAAEwAAA21pbm9yX3ZlcnNpb24ANTEyAFRYWFgAAAAkAAADY29tcGF0aWJsZV9icmFuZHMAaXNvbWlzbzJhdmMxbXA0MQBUWFhYAAAANgAAA2Rlc2NyaXB0aW9uAEJpbGliaWxpIFZYQ29kZSBTd2FybSBUcmFuc2NvZGVyIHYxLjMuMzMAVFNTRQAAAA4AAANMYXZmNjEuNy4xMDMAAAAAAAAAAAAAAP/zWMAAAAAAAAAAAABJbmZvAAAADwAAAekAAM8AAAQGCQsOEBMVFxodICIlJyosLjE0Nzk8PkFDRUhKTlBTVVdaXF9hZWdqbG5xc3Z4fH6Bg4WIio2PkpWXmpyfoaSmqayusbO2uLu9wMLFyMrNz9LU1tnc3+Hk5unr7fDy9vj7/QAAAABMYXZjNjEuMTkAAAAAAAAAAAAAAAAkA1UAAAAAAADPANsQQ08AAAAAAAAAAAAAAP/zOMQAE1o1BFQA0pxJar4DMieXzIxxh0MjIzJ5YRkXLFYjHGdHn/2KZbjnsThdR3c3Nhf9R25Rac29z3bj3NvzYyZe5tticP/l3V0qshNCwsPmEaCYRZzRkyqzyZO///Z977PJoZZ6esCAAP/zOMQRFJpZwAFGQAH93e+X/dz3/9E/hHd3//3d+SwbgsDwwUMT4e4IMTQUFz30RBRIRET0Q99ErcsUFEREr/3Fxc+93eEFDK/3Fxc/MfX//UONj/8LyC48D/5WDJdOc3micDQBgbgDfP8VoP/zOMQdG+PKlAGZoADQIuVP/KZPmpff/8i5uaFcmCc//xSAfIVAbAAbGB4IB//+XSDkgTZEy6T7l////84ThWIoaJIRmCos0/////usmyfIIyZgXDQ3My+Rf//////zdTIcAPw84PfAIP48mv/zOMQMGEsu4ZWLUABQk4roexlQgKBPKATIRj8kHg1CDOOS0V3Zf/f/dP9inOHhMKpfRh4bnmHiyeQy1LeWPtTlE3/m+b0br/+3//qeYn9nmMUM957oPDBXPGpKVPL/9H/JKgDAGJtkAKgB/f/zOMQJF4Iy9l/CaABIUK3UKEFtRUQUAjkJMkigX0jQWY3AG2HsKgNo9yXUJ4HMTN0FupAnjDjIW6fUXHb0DM3T9jMlzdNlepv////rVToexwuMZn2UpzEV/7Mcz1is6eKoAGlmtsPL9RnRZP/zOMQKF4n/DvQDzj5oFjc/vTUpTPG3W+MzWeopCI7LCne4uYJYnsz72Ek1SZMfJjgQgtEsn7Hi4wcIMe7ipJ/UdIN/T/PmGKeyqPJdF1+3cuGCQGTV6YZZ+sR9x3b5TtVVAGq5iXQAG5j+Ev/zOMQKF7oG9xQDyjgSDkVETWJIqGz94PWWO2c2hT4tl/lNNxgoRFKxlMBw4Lg76KuVBzWdUMHg4PWQzSkOVOkjOej1QWKytmdf6eVRssQrxSo4fFgt5mtexP0KHg8MQERGAFeXdrIDSx/SUf/zOMQKFak/AvSTxnY4AlgZBsC9PxTKNk/7aBUIQoK7z6T2TjmhjJHgbx0mAXCV3/JQR2uf+4DgCIU/DCtYY1KCBsOqcAymo4RJ6pENX4F/Qf///dWskDoBRQCVmNrXE5LJB+k7VGQA+bkALv/zOMQSFHErLv6DBtJX0cPmYT+l7zM7NxyOTcwym/lWVp8RA/osclhi3w94iFGMwwdmvEiXA0HQ4ws/gJHeyARLf18wOv/+r9yYVtS5AOdswXAAFfraP1JI6SzyYTgsRW61+spiYhLDFCdm///zOMQfFOma/x5phSRZdmQlb/+W2YaKEkiNwEBEt3R1f6NuCVkptYpSoHEFDkkuXdBVypb/xKMDqxD+txxH+1T8ggB53AJAMSAp4oihKFwWNSx///l8fyfBukPsr3BUJ1qHgfN6QnymQM/9e//zOMQqFLkO3m4AXkB2YUVguqYq6lFcN1Qs8+0rCrQ4/5MTg/5AaB/rBN9eJTX/t4SaGNodJwCYZaU1Nm24bD7GLTKhGFANNRCoWLBPdm0AIWoLlSod9RI39Ss/Q39UYxkM/opTKWhZjOitrP/zOMQ2FHs/Jx4CSjPdSm/+/b3T/////+iIvypTkJepUO1eJiD1MIKsAKqXMSJcu0ZHinDFmmTgQEIDHJq5CosIIK8s87qCLML39WmMrATlK3mdXdFLRfY5DFdw58in2zQFRzk/1OJ7DPJWf//zOMRDFEH+3v4CRCyucAxLxnopJHmazoaASwAAmYQCAXuA1rq9yBM04DZKQtwlt2+ldElwHAAH44hzCcqU1b+tN3Qb/rWXzYZQdhgdL/9abkMIgZDMEeSJff+1ZNm6gSMP5diDn9AeV8nf9P/zOMRRFHmm5xQGZGhTADwCx2iMDKlV/6qJroBcOK2K5ipJAwaowXpF4ZAPXK5sj6286TIhABjYx55JNv60VGxgJObpLb/rLpQIGTrKNm/9SZMLb//V//9LV/+kifTmfrUACx1BEqgcLSRUB//zOMReFKLK2YAD5ICQtn/SqRLiFRwLotkXPqOOdQPq6DhIj7f/WTxuBLgN43NEv/qTIoca//7rHwoo//zFAlhgFIf/0P//rSb//RRPt//spBjQ4ywADT5Jyci8PT+GDJCvRzhae7+iOoDwNP/zOMRqFLsm6lYAWmOcec5FNqIIRZEbuD4AkTmc3/yEiECIV2//kYXIrG//sRMREyP//kJL//v///Nb//iqPW//oceSoxEdAtQsAPE5B+hCSA3Z6KcnQP4ghwzy7gQKf5vmjpJjEd+0BjvbOv/zOMR2FDsm+lYD1GqO+/vAbVIy2eTYPuWRpziQqAuTo2c/vyanOchCEKJrR//fl0IpzuuejXkJ9CbXkn/zuy3ZZhuBHP/+SehHKgLSGBe5MP/5hFhwbENY2AydT6eUHVzSv3NHorHaTTzmUv/zOMSEGIrS0k4TypspMl55hpKBbNfud9S+0ES9bUFUkDrjSB20rtbUPL/S+KxZTOhc2zMGQRNrLP/8cyMvzizXQt0jDZ67RESYwhX+VuYsbQZ2weJXXY5hNBme3+vNLG+FFcFwJIgX5KzLL//zOMSAJVMy1i5aX5PrRC3JMoXG+v6U+tWzSr0530B5NSXqAkAcShcg///zJXPievexd3khvCbEtOZSyYgtx2ilmgb8CW+L6/+cQkMcPuu9WtXGf6LtRuG6f53RUwWxtnkJ4WBD3m6eh2chDv/zOMRJJVMy6i55ca8gEATaRymK6b//tkJV3Z2fqnUSCQmIOhnERiCZkJ9CuQbVWUkCDmKqOPIbTdn7hxiTYnbdVgTkwpplqiwldTCbmpBhXg2Hoi78/UEF6gCIVYUkKpFJuCs2rSHPgAHAY//zOMQSGaNDBx4DFD5g3Aws+c+lp3kMPR/EArmh1/T6IF0C2AsPSBiEL/txiWAogrLevmlAXhOFkQ5PM/6kIwb/5prOv/nI8V3//1X/6Pt/oPmmoSf+hxd0Rv1NUVTHNIDKANlGlhk/QVrMP//zOMQKFpq6+x4D2jy9KMGob9+PB45H44f/5v/l+MhLE1ip1ROEFR/UZCSh5RqTNv02KAGoJZnp/9QniT//sXkf/SbRb/7JmQ8T1K/W26DKd//7//rMzn6gK7yxkhUAqTCwNQAIxcYxlsJmIf/zOMQOFHlG3v4D1DDL6yxZe3EeNdl/kWLwJQuRcKaGIchztyg+Hpjqw4f+grMpvm/MULkL0mBoWAp0rlnlcRHv8TB38oPBIWgrh3+Cv/+MJAJEogDQ8kA2h0wtKbvPrjoDJQMv3zdTQuHoF//zOMQbFKJGxlYDFDIn/6xmQrlA6Nv5INT02kRre5YwfFzf/spnc1n3NrZ//tZNTld5xzqrGj08NChsHziCfy8Shqj5igCDAIABI5B/+p544IgLAfgBi9kb8gplSJ5/P6K5/rmN/9VMMj5N0f/zOMQnHPM+0b47TckU2e/9UGhAzy4aJ5ID0HAEjKZJmw4B6Il93/+pBAuMmm/pvQQM3WOMS8c6RfTT/+oEQyHu/2xlkC08BwuyYsBgMLPJ6ZhAtPAcLJk9zv/6KKLQR01Rb/SRWm6IcgdiTv/zOMQSGHM20ABrD6Cv1dtS3p/+taZodQbu/6UhgYEwnksUJ6zRye9hwFgPAdgHlhJHSP+hinmNzf/uYYOERLEUidm/zDO6KRt0MoSF5p43KhIUG1G26jsbjBMaKgAApXlWn22UQD//fEILif/zOMQPE9n7Mx471Qq1v6n4kMYYXpyHa+JyW83k1f+suXciUNOA4q1l/+eMCWd+iTiQZhOBGHSQsIEa+3qikQ3NVl/+8Zun///8QxEDVYAM6G5yLa4r/+ydMHkMptf+o6aIn+X8SRQZhapKy//zOMQeFlsu8lZr1Quv/arc+J4A2icqdrt/8oTiUBVA+TT//R1NC9Jf/5ik7m//yIjQoTV//b//1d//8gHgtEz//oxO3dpCgUqACv5o/aNHP///sZRWKQCABCzu+Y9A4QFFIfwZPQ5v9N0WHP/zOMQjE+mq9k5cES6w24rf+huRguQWJ3X/0EBwPZFf3v+N3cs41v8S9j9f1g4GxidYP5QGn/yPuL0AeL6kHiWDYmKAXPk1Gf/03OBIIxPODuJJdLv/7iS4fQCERIXp/7lqyPkZbfl+vqJHQv/zOMQyFLqW/jYCyl6Roi3/T+eMEQsKD4cBgKMf//74gNFiBYgJoU4id8W//zAACCT0AODQgP8d2PDUVjiOV9fLUTBzU4HoyW2C/ccJGc9GNFo5KKhw2P6lyhxxxucqZ4TiMSGx3+rsr/+w3P/zOMQ+FHIO2vYDzlTf/oa/fsqGFR4qcP9v1DybyfxESgA8AEGH/+HK6N/YpDEERSqUXbbWKsSRDAC44SLJvhn+bKm5uft//xJJThhox7+v+rHSJw8GbOXxU8oqKf/R/oQnqX//9T8h3ZAKYP/zOMRLFKKO5YwSxPignDH/8ocB+gAFtYFCIMyB//qBUC8YAWMtzfMOKy8zWqWtv9IlMBCG0ZGDdWuIdczRckyzlf/LWtRhM3r/7HaTZNTUgQQABycCY80X7fO//Lrr///bzDiRQvWqAFbhBP/zOMRXFKJ69nw6xPmLJKg/+c1oZ0QRsTAOiJpWeRj8SwKwAgc7dDqsFCAaWLMn11ISY8LB//zWNLD//+MhDB6BAF40wz/kb//od//8///Y9fnz8weFypO3+moA3FW3ACfIWb4+mdggl33pSP/zOMRjFFLW9m4L1Ia+XGIRxNnutTTc01QhElv9Z48SYdLWf6nKg1IlBKf/9R4l//c4IRcKRaccOlk/mt0df//////Sa30Oeg2eUGpH/TUD5zZwuRuNwSH4OmBAl8hap6ddoRIy7/xv+A+2nf/zOMRwFJre8x4DzjBX0a4NoWs9jsKYTQU/2srHR9tbJlSqf/zGUqALIDVRt5OpQsGJNKyihA5P//5heoYENjARHE0DVGUMXhbH77mjqbdtmgvTE//VfdSUQITwLEk/XxgYKgYCjGuZfLpiCv/zOMR8FLGa8l4DxD689P3NESCJJ8/Lc3AxYIRAYshiu6je6kIgdxdMgUvssfFmej22K4TS1qr+YboxFH0zM7hmvkOyMPhPHA9Wr8hJ76RTH1udK63/np7dKuIFKR4lknQswQAFBKAc4ws8XP/zOMSIFImazlQCRjyBBCPGhgUAeCskhxtxPBlxLVf+/8LXaFoF2Pro4QIfo1UAVy1JuRsOQZwqGgrybh8OxfLeW9yu1YdxdLftMngljVfX/vwHh48cc5qqUvMB8Fg6TzVmyiTTU1a93otqWv/zOMSUFWoS3AADEHhrSK4PshrU7//0OMf2RqRM56IPo9YAB4azQSQOycf/JgoGr1lzuPkhJa84/qOjY76ORAWAGAQAc6mfOHDP+ggGFFCv/Ohv53ohvnkWCFfY7qdH///IdxEMKzfosv68rf/zOMSdFLmTHl4AVk6tnQQdCiXeQtjEDAPddGlh1bg/RcwSggYglkRUF4yAZJSR/TEADaTP//HYGAXqLNGF8fWZDkK/+hDh0z/+Zy+p3Dpv6EKhv1cgsUIAYPP6v/+xkKVvyp///7GMUvucYP/zOMSpFULy+xZpxJh5fUaqAJa5tBAQdWnH6b5wQULExPXSmo5ykGwME7fjQAwTf6CLFILo1Q1ORhLC+JiJ/49C+FYWVHbrX/gYxjP9XVv5BAsBKFfv/9Hiwt1BgP/zqwA3NTEAmOzMACXy3f/zOMSzFdL/ClZTyybGb3YC2C+ZVyZeWMt6cLYjF0QmBTO+p4KBst9R8mgLT/1niMXsZbnjgPlMLl6mX/1PoVc37K6P/mjxJP9Dv////9W/9k/1b/aOt/oOmgK9qADtv+onG5CZyKLC2TC2cf/zOMS6FLna7xZqhQyLlwfXZ68XSkjZSqxgsc0itBI9L3UrKckmr03wndjlmUc3Cj5gUpOmilr1tAqxWp6fHdIbUFRVHoufeVqsXrWCtQCu4ADiSqIxWDgehEFA8P9sc3dWlcEwPltYscc+Lf/zOMTGFTsu8v4DzjQztNFlJ3/ov666EzJ69+aLYHJgdf75nHK+3hvllDAxoFAQWbXlz/wQd/wqxrf2u+cP0+s+HwITJBLthwf//4jU8JiOrGX+f/WrcYKSRhJ4lPfGP4DIaUrOr2fdLYjMMP/zOMTQFJki3j4DEDQKtDFQu0PZHCHtUValyqGWta6+zkHXKP/1U3/RzTzH/oVEQmayqsRAGCQcaK2HJlGPPe///////4d3UJ0/a5FSbe5Fc404iPgBrGIUAHV6wAAsahfH+qpMcIGSFoDhfP/zOMTcFMEm1j4AmCD+3lhKJxkPRCX/8VySSSQRlD741kh3F1FYxE4Rea9MQp/07HWn///qrkb/9X1VRkgIcIBsDAiBl3/7v9X240VN1QBFKQgHxjA3c6IEhCUtNx/y5MPJEJlbaRW/nNjan//zOMToHXsu6jZ515J0+0Ug9EwvEgF4s/PzlQVkhoDwh9DnV40LCOJafm+tT+lW0PM/////4+NybA9PDA8RGwQlwgFlVPPsWJHOxMUEEQi4VcwQARGVx2ex5CtW7DmGkGwal8//KzQgmkgtOP/zOMTRFMoK7v5qxJxSor/641iYSvtY2UgLDzbS4/5SlAVT/zGN70+kpTKiudF1GDGX/////7fKJvER4y9ZY9+tCgeqlZYRJL/eSjvMSk4alDxcBKAUIJdsMg72kicQKBjFcN5qW/7yoFS1+v/zOMTcF7Lu+lYCzl77XKVCr+1XNmoZisJnFSs1CJIt1VnXya7oUomJA0njPAhn9fLnyZwDGkyD1Ce5Y8+cFR2MBpuCtAgb10uHWa8t416kdzgtnZkAgo6mLSS2r5GLOEEQMGFPP6r+ll1y5P/zOMTcFJqq4v5qBNRLV6vLXj/Dvh0lEEUYoFDt///vxuSjl4bVXUCh6FQjP9HMUEic6rCiG1ycjWHG6z7SDLpjP76x4gxJHCnXSeTdmt55sbir+XW3fFh5lqeiACERIKFy5dGkmkiBEXI4Fv/zOMToF4Hq2x4Kynwq8TEIiJ6CjiBkIgALQ7kATZInB/3LpAnnSPFfDbADEOUhKtg1/e5rRvZ0LQssZaUr//r/0gMm9+LfWLfH3DXBC1W54xqcdMV8wxbfxr51n/9Ivc59bP7f3Lb/9LsqGf/zOMTpJTM+2v4OEk1+pTliQ2qchBmZ+8//86KSSz/K/iPn/PJ7SFI77IX+0eDEiILBoS/avmvVr31EtpBVDFUAWyQNRtqrP/rZaISUTUgmBfZJ13buLIewnQwpjRZX1juDhFw8dIxeLza9Sf/zOMSzIYsy5v6DzL167wgQDWMrj2Oe8W9XsHnG/6VUwaGf9+ab6ndL5Iw5W/8qzf/XORl52uhhNy7++Hyb9JkAeu52EORJQf/RUipZDOmqbaLGphpjtDoNI7BkEmeU3UmaphUAcQSM+m//D//zOMSLF8LC/lxuD2KTAdoQXY/3V/LZYiTl52Tf/ybmBUNo/yWB8nN9Tu2Ji3R9REOByz/L//+QweDpifXpK1f/WokDMRs/8TcAmVWVBVAcIBw/U2upaAkYgkRwnMihEF9b9EiwXLDlg9kdyP/zOMSLGgNC+l5qy2qYJ60HlMSoOjAy4Vo6mV9SikTxDQDUArhqbXWi76zWR4txAhmETBn/MVlILXA2o4Zm//HxkmqM/9xwqAs9//zDyB5/vrZAsF9Ls/zY3DJMnX+tB0ZIm48QIGCIRVUAy//zOMSCH9Mq0x6VD2ll6RSAJoNmK6pTHreCIAqAGQZd4G6k+xiRoE8m2+lUiUiDiEhNBwxP9X9TrRNR0hqwkGoIJepRiOSIWHLC3wT6g36kywGXhBIQXDCYpdJv+smSdQIGPCH/9I0//MS6cP/zOMRhHUsO5xwD4DGHm6b/XpIqdBTf/S0Dpv/omLB+ayoAmYKJESAEX9BA+iybJoCCRcDpxSC1LQsjqcjxQIWiG/b+YC5BXQE7CzR43t6tI2ODGgvClaRm33YvpKD0AbhCiV2f/KrEiCHAnP/zOMRKHeMmzxicFW22/+kQwRwMi3zvsgsCqSN/rsJYA8Dp3/5GIsL8GlX6/ZhXBvAWFLr+d0Jx[... ELLIPSIZATION ...]xbxg+e62NaVyFZOJ/It5IkkBf17PlbX9bmJnrJQE2t04LK59gjEWHCvSKs87YFMJ2f6+r4hVAbaA0PabZuMn4fuYXjE/dG9/AxP/zOMToF4Hq2x4Kynwq8TEIiJ6CjiBkIgALQ7kATZInB/3LpAnnSPFfDbADEOUhKtg1/e5rRvZ0LQssZaUr//r/0gMm9+LfWLfH3DXBC1W54xqcdMV8wxbfxr51n/9Ivc59bP7f3Lb/9LsqGf/zOMTpJTM+2v4OEk1+pTliQ2qchBmZ+8//86KSSz/K/iPn/PJ7SFI77IX+0eDEiILBoS/avmvVr31EtpBVDFUAWyQNRtqrP/rZaISUTUgmBfZJ13buLIewnQwpjRZX1juDhFw8dIxeLza9Sf/zOMSzIYsy5v6DzL167wgQDWMrj2Oe8W9XsHnG/6VUwaGf9+ab6ndL5Iw5W/8qzf/XORl52uhhNy7++Hyb9JkAeu52EORJQf/RUipZDOmqbaLGphpjtDoNI7BkEmeU3UmaphUAcQSM+m//D//zOMSLF8LC/lxuD2KTAdoQXY/3V/LZYiTl52Tf/ybmBUNo/yWB8nN9Tu2Ji3R9REOByz/L//+QweDpifXpK1f/WokDMRs/8TcAmVWVBVAcIBw/U2upaAkYgkRwnMihEF9b9EiwXLDlg9kdyP/zOMSLGgNC+l5qy2qYJ60HlMSoOjAy4Vo6mV9SikTxDQDUArhqbXWi76zWR4txAhmETBn/MVlILXA2o4Zm//HxkmqM/9xwqAs9//zDyB5/vrZAsF9Ls/zY3DJMnX+tB0ZIm48QIGCIRVUAy//zOMSCH9Mq0x6VD2ll6RSAJoNmK6pTHreCIAqAGQZd4G6k+xiRoE8m2+lUiUiDiEhNBwxP9X9TrRNR0hqwkGoIJepRiOSIWHLC3wT6g36kywGXhBIQXDCYpdJv+smSdQIGPCH/9I0//MS6cP/zOMRhHUsO5xwD4DGHm6b/XpIqdBTf/S0Dpv/omLB+ayoAmYKJESAEX9BA+iybJoCCRcDpxSC1LQsjqcjxQIWiG/b+YC5BXQE7CzR43t6tI2ODGgvClaRm33YvpKD0AbhCiV2f/KrEiCHAnP/zOMRKHeMmzxicFW22/+kQwRwMi3zvsgsCqSN/rsJYA8Dp3/5GIsL8GlX6/ZhXBvAWFLr+d0Jx[TRUNCATED FOR TOOL CALL]';

let audioCtx;
let sourceBuffer;
let loadingPromise;
let activeKeys = new Set();

function createAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function decodeBase64Audio() {
  if (sourceBuffer) return Promise.resolve(sourceBuffer);
  if (loadingPromise) return loadingPromise;
  const ctx = createAudioContext();
  loadState.textContent = 'SOUND · LOADING';
  loadingPromise = (async () => {
    const binary = atob(SOURCE_AUDIO_B64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    sourceBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0));
    loadState.textContent = 'SOUND · READY';
    return sourceBuffer;
  })().catch(err => {
    console.error(err);
    loadState.textContent = 'SOUND · ERROR';
    throw err;
  });
  return loadingPromise;
}

async function ensureAudio() {
  const ctx = createAudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  return decodeBase64Audio();
}

async function playSlice(key, velocity = 1) {
  const slice = SLICES[key];
  if (!slice) return;
  const buffer = await ensureAudio();
  const ctx = createAudioContext();
  const src = ctx.createBufferSource();
  const gain = ctx.createGain();
  src.buffer = buffer;
  gain.gain.value = Math.min(0.95, 0.62 + velocity * 0.18);
  src.connect(gain);
  gain.connect(ctx.destination);
  const [start, duration] = slice;
  src.start(0, start, duration);
}

function visualHit(key, repeat = false) {
  const label = LABELS[key];
  const color = COLORS[label] || '#f5f5f0';
  stage.style.background = color;
  stage.style.color = (label === '咚' || label === '鸡') ? '#111' : '#fff';
  word.textContent = label;
  subword.textContent = `KEY ${key} · 大狗叫 / 叮咚鸡`;
  keyLabel.textContent = `KEY · ${key} / ${label}`;
  app.classList.remove('hit', 'repeat-hit');
  void app.offsetWidth;
  app.classList.add(repeat ? 'repeat-hit' : 'hit');
  setActiveButton(key, true);
}

function trigger(key, repeat = false) {
  if (!LABELS[key]) return;
  playSlice(key, repeat ? 1.15 : 1).catch(console.error);
  visualHit(key, repeat);
}

function keyDown(key, repeatedByBrowser = false) {
  if (!LABELS[key]) return;
  if (!activeKeys.has(key)) {
    activeKeys.add(key);
    trigger(key, false);
  } else if (repeatedByBrowser) {
    trigger(key, true);
  }
}

function keyUp(key) {
  if (!LABELS[key]) return;
  activeKeys.delete(key);
  setActiveButton(key, false);
}

function setActiveButton(key, on) {
  const el = keyboard.querySelector(`[data-key="${key}"]`);
  if (el) el.classList.toggle('is-active', on);
}

function reset() {
  activeKeys.clear();
  app.classList.remove('hit', 'repeat-hit');
  stage.style.background = '#0c0c0c';
  stage.style.color = '#f5f5f0';
  word.textContent = 'QWERTY';
  subword.textContent = '按键演奏：叮咚鸡 / 大狗大狗 / 叫叫叫';
  keyLabel.textContent = 'KEY · —';
  document.querySelectorAll('.key').forEach(el => el.classList.remove('is-active'));
}

function buildKeyboard() {
  ROWS.forEach((rowText, rowIndex) => {
    const row = document.createElement('div');
    row.className = `key-row row-${rowIndex + 1}`;
    [...rowText].forEach(key => {
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.dataset.key = key;
      btn.type = 'button';
      btn.innerHTML = `<span class="latin">${key}</span><span class="cn">${LABELS[key]}</span>`;
      btn.addEventListener('pointerdown', async e => {
        e.preventDefault();
        await ensureAudio().catch(() => null);
        keyDown(key, false);
      });
      const release = () => keyUp(key);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointercancel', release);
      btn.addEventListener('pointerleave', e => { if (e.buttons === 0) release(); });
      row.appendChild(btn);
    });
    keyboard.appendChild(row);
  });
}

window.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const key = e.key.toUpperCase();
  if (!LABELS[key]) return;
  e.preventDefault();
  keyDown(key, e.repeat);
});
window.addEventListener('keyup', e => keyUp(e.key.toUpperCase()));
window.addEventListener('blur', () => [...activeKeys].forEach(keyUp));
window.addEventListener('pointerdown', () => ensureAudio().catch(() => null), { once: true });

buildKeyboard();
decodeBase64Audio().catch(() => null);
reset();
