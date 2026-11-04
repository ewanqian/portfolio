const app = document.querySelector('#app');
const stage = document.querySelector('#stage');
const word = document.querySelector('#word');
const subword = document.querySelector('#subword');
const keyLabel = document.querySelector('#keyLabel');
const keyboard = document.querySelector('#keyboard');
const loadState = document.querySelector('#loadState');

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const LABELS = {"Q": "叮", "W": "咚", "E": "鸡", "R": "叮", "T": "咚", "Y": "鸡", "U": "大", "I": "狗", "O": "大", "P": "狗", "A": "叫", "S": "叫", "D": "叫", "F": "叮", "G": "咚", "H": "鸡", "J": "叮", "K": "咚", "L": "鸡", "Z": "大", "X": "狗", "C": "大", "V": "狗", "B": "叫", "N": "叫", "M": "叫"};
const COLORS = {"叮": "#2F6BFF", "咚": "#FFD22E", "鸡": "#68D65C", "大": "#FF5B45", "狗": "#FF8A34", "叫": "#EC5CFF"};
const SAMPLE_RATE = 4000;
const SAMPLE_PCM = {"叮": "gH9/gIB/f4CAf39/gIB/f4B/gIB/gIB/gH9/gH9/gH+AgH9/gH+AgH+AgH+AgH+Af3+Af3+AgIB/f3+AfoCAf4B/f4CAf4B/gIB/f4B/f4B/gH9/f4B/gICAf35/gIGAgH9/f35/gYGAf35+gIGAf3+Af39/gIF/f3+AgIB/fn9/gICAgIB+f3+AgIF/f35/f4CBf4B/gH9/f4KBgH5+gIB/gIF/fn9/goCAgYB8fH+BhIB/foJ3goGIfYB1fnuEin+IcYhwhHOUgYt5aYNzlYSXdXBoiImIiXV5d4iNiHpsa4iTmYt2XlVyq7+VZ1xhbXqPoqigbVBSaIqQmKWlj1g7T3uoqZeRkX1RQWKatp6Ce4R9WVNxo7SPcnWHg2JTc6KzjWx3i4xkUG+ZspJxeYeMbU5pk6uZdneDinVWZYWno3p6fYaDXF1+maeJdn+DhWldb42mkX57eot3XWx+oZ96d3qJh2NifZuff3F9j4hoYnubl3VxgIyJbWqJlYZwbYWRgXZ5ipZ5YXKMkoN0f5mPZ111lZNzeo6YilxYgpWKeHyQnYVYWX2akXJ9lpyGUlSGm4t2gZmcfVJdgpeNd4eXlH9SWYSVjHuFlpd7UlyAlo55hpSVgVJWgJmUenuTnYFRUn6nmnB3kaKJSEyGrp1ra5argkNKi7qXXnCarH83UJm3jlxxo65qNV2htn9bgqmgWThzq6dyZ42siUZNiK2ZaXKgomtAYqGuf2WIqYtMR4SzmWl0n51nQGCnsHVslqR8QEuXuH5jk7KOPTSIxo9RgrytUBplx69YbKu/dx5Aq79zaZa5lDUuib6MbImup1ElZ7Wgd4abqWwtV5+efpOenXMxVZyXfI+lpHc7Qo2hgJKdoIJFRHigf4W0o4dIK32pgXahuplWJVqni4GmqJ1kOlaDjIOnt6JsNUKBn4iFrsCIQxpkr5SLoLmZTSZWlpODtsGaWRZRkZCRnri4bisma6KiqaOriz4iVZCgpbW6jUETU5mQnLe4p1kMQoKKrLyyo2EwPGeClsnDoXozI2WMkq2+t5ROC0eWiKrHqqVgFT58h5zEv6hvJyRyjY+9vKqNRhdIh5m5v6OUZR81eYGs1bOXZys1aXmYzMSjfDgiYHqPxb+siUUnVXaFuMmrk1QcWnl+t7msnl0nR3aEtMGbl3IwUGV0vsGjjWpGUG5mnNOokHY4XHtah7+5m3lMSoNtZa6xopFUUXh0cIeipJJ3WWt4boePlJp/dnVtbnaHko2KhIaBZ2x5goeAhZeRgG9ufXh0e4eWkH+BgXpxcXuDgYCJkYh6fHx9dW95iIqFhYmJgXNteX17fYaRj4F7fH13cHiDioWCh4h/d3R7fnp/hYqFf35/fXl4gYSAgICHhXx5foF9eH6EioN8gIJ/d3Z/h4N/gYWCfHZ7hIJ/gIKFf3l/goJ+fYOCfHmBhoJ+foOCeXd/hIV/foSDfHl9gYOAfoGCf359f4GAf3+AgA==", "咚": "gIB/f4CAgH9/f4B/foCBgH9+f4F/foGCgn58f4J/fn+Bg398foGBf36Bgn99foCBgH+AgoB9fn+BgH6AgoB+fX+CgH6BgoF+fH+DgH5/goJ+e36CgX9+gYOAfHyBgoB+f4KBfXx/gYF/foGBfn1+gYGAf4GBfn1+gIGAfoGCfnx+gYKAfoGCf3x9gIKBfn+CgX18f4KCf32Bgn58fYGCgX2AgYB9fYCCgX5/gYB+fX+CgH9/gIB+foCBgH9/gYF9fYCBgX9+gYF+fX6Cgn9+f4CAfX2BgoGAfoCBfn6AgYGBfn+Afn6AgIGBf39/fn6AgIGAf3+Af35/gYKAf36AgH5+gYKBf31/gX9+gIGCgX1+gIB/f4CCgX59f4B/gICBgn9+fn9/gIGAgYB/fn5+gIGBgIB/fn9+f4GAgIKAfX5/f4B/gIKBfX1/gIB/gIOBfX1/gIB+f4OCfn19gYF+f4KCgH18gIB/gICBgX58f4CAgICAgn58f3+AgICBgn99fn+BgICBgYB9fX+BgICAgYF9fH+BgYB/gYF+fX6AgoB/gYF/fX2Agn+AgIGAfX2AgoB/gIGBfXyAgoB/f4GCfXx/goF/f4GCfnx9gYGAf4GCf3x9gIGAf4CBgH19f4GAgICBgH5+f4CAgICBgH5+f4CAf3+CgX5+fn+Af3+CgX9+fn6Af3+Cg4B+fn5/fn+Cg4B+fn1+fn+ChIF/fn1+fn+DhYJ/fnx9fn6ChoSAf3t7fn2BhYWBgHx6fX5/hYWBgX17e36AgoSBgn96fX58g4KAhIB+fnx9goCAgYGBfX5/gH2AgH5/g4OAfH+Df3x8foCEgoF/f4J9eHx/gYSEgoCDfnx2eIKAg4mFg317gXl3fICChImJgHl+gHt0eYCGhoWLg3x+dnR0e4qIhIuHgnp2eHV0foqNi4iBfXx4dXB5hYeJjYyCd3d9dHF7hoqIjo1+dXZ8dnJ+hYuJjIl5d3t6dXWAhIiNjIR6ent5cXl/go2NjYB6d3h8dnp+goyOiH15fH18d3d8f4yOioN5fnx0dHZ7iJKPiIR6d3Z2dXaAipSShHp+fHBvdX6Jj5KNfXNxdH+MhHl6eYOGhI+WhGFRZoqcpqWLY0legX2JwMt6IDiPwHc+rvCGC0q5qmo5i/CaJE+/lUZri7GlWFigoVBel46Rh2N/qHdOeZiIh35nmaJdWoSeg3t3dLCETmyNpHJ2eYW2ZVN5lqNheHmVrkxggqGYUH+Dp5k6cY6nf0uQjKl8PISToWdWm5GnaEmNlpRXaaCYnVZVl5t/UnyinYtPZZ+XaVuKo5x5UHOniVxrkqaVaVSCq3RZfJWmiGBck6RfZIiYon1aZqORVHWMm51xVnisdleHjJ2WZFaQpl5ojYqkjFRgp5JSeomPqXtIdrN3VYSEmqlmRJGxYV+HhaegUE6qoVRshouxjz5iuYtRdoSVtXk0fL54V3uFm6ZnTo+fcm6AhJCMb3KIhXx+gA==", "鸡": "gHx9g42GdX2Od15wkLCVV3qjalBckt2iQmykbFVnitWiRXaOXGl4lsSQVn+BQ2iVpMWATop5O12Vu9aMOXB8PWKRtuabPVprQ2agstOjTF5gP2qjtcCdYWpsNUeYydSYWXB7RiplwvTGa1lrVj1Ch+TtpWVfXkhCWZ/d0pVwdFs6QWOl1cGShHhLPE5zqrmllJSCUkBPcJasq6KriEQ2SWeSq6mwvZJLNEVgdIeducyteF1STFZsfZuvoZWOhHZpXl53gn+NnayifV5abmlifKC4pYR6fXhWSm6VnoiEmKSOXFZzfnZrfZ+vm3p3d2hZVXOasaiQhnhrYVpoiqecgnt7gnxpc5GVem12hZCBdYuXeWBof46Qg4aaimRdcoOLjIqPlXpdZnqHjo2AhZB7bHF9jY13aoSUg3p7h45+Z2qIjYGDgoiIdGd1jIiEhoCFg3FqfI2EgYiDhX9tcYiIfYOBf4eCcneLg3eAfoCLhHd7g3x6f32EjoF3gIJ6fHl4jJB6dYWEe3x8gIuBd4CDe3yFgYCJgm96gHyDiX+Ji3Nxe313iYmGhoR1d4N3fol8eIqBdoKJgIR/c3uEdXqGiYuGfXR/gXB4h4eEhX5/indze4iDf4J8fYKAgIeJfnVzaIePhIyThHxyXG99hJKjo5BwTU5kfZ20u5pzSD9QeJ+3zKR3QDRNd6G81KlyMypPf6XE2appJCdVh6fJ3ahcGSxdjKbM4KRNFDRokqHN35tAEz56mpvJ2pA5FkiLn5bB0Ig2G1GVoZa7xoE0IFmaoZu6v3s0I1yYnqC9uno3JFuWmaO+tYFBJleTkp27soxSKVGQjI+zsJlnMUmIiYSrsaN5PER8gnqlt6eDSEhzd3CgwKqFUlFwbWSax6yDWVdvaGGWyKyCYVtpZmuaw6R6ZmFiZH2owJlrZGZfYYq6wo9bW2hhYozFyIpRVGdhZ43GzotMUGZdbJLC0JFNTGVXapy/y5lUR2NUZKPBwpteR19VXaXJvZRkTlxUWqDPwo5gVV9TVpvNypBWU2lZU5bIyplSR29qVIzBx6NaOGR7YYG1xK5sNUx8c3unv7aBPjpufXuYuryUUDZbeX6Ps8ChZDxRa3uKq8StckFNYnSFoMO4gkNHYXCBlb/Ck0c6YXJ9h7jPpVApWnyCeqXWu2MeSH+MdY3Rz30gN3uSdXfC25gtK3SUemqv265BJmyQfGah07pVJmaNfGOazb1kKGOMfF+UzMBuKmCMflyOy8F2KV6MflqHy8N+KVqOgFl/y8WGK1SQgFh4yseOL02Pgltxx8mXNkSMhmFpvsmgQTiGjWtjsMiqTip9lXZeoci0Wx1wnYFYk8rAaRRioolTiMvKdRNWo45RgMrPgBlNno9SesjOhyJLmI1Xd8PKiylKk49gdL7GjidFj5Vsc7vHkiA6i5lzdL/NlRw0iJZxdsXSlBw1iY9qd8nVkSVAi4dpe7O4h0xdh4NzfZWWgXF3gYCA", "大": "gH+AgX99foCBf4CCgn57f4J/fH+Ghn52eX6Bg4aHgXp3fYB9fYWKhn13e3x8f4aJgnt6goJ6eYGJhn55fn97fYOIhX15f4F7en+GhoJ8fn98fYCDgoB+gIF+fn+Af4B/gIF/gYF/fH1+gIGBgoF/fH5/f3+AhIN/e3x/gIGBg4J9enx/gIGBhYV/eXp+gYKBg4R/eXp/goJ/goWBenh7gIOBg4WCfHl7fn9+goiHgHt7e318gIaHgn5+fXx5fISGg3+Af318fYKDgX5/gH99foOEgH1+fn5+gIODgn9+fX19f4KDgn9+fn1+gYOCgYB/fHx/goOBgYF/fHx/goF/gYOAfHyAgYB/gIKAfHuAg4F/goJ+e3uAgoB/gISCfHx/f3x/hoWAfXh8goF/goOBe3qBf4KBgoB+fnqBhH1+gYKAfn1/gHuBhoB+hYFzc4KMjn59fnJtg5mQeYOLRFTCvoROanov0vRhF2rVVlXJqktFu6gWhuJoTYfGWBTVz0hFtaVAT8OvSWW1izV9raBadKFxXICfol1soHVjdaakUnCjd192tpFOfKRuYIeqg1yBmHJejKmCXH+hZ1qcqXNZk59XXqqacWmVjVdwpol1dpGGWXudh3V4kolUeKaKZ3eZi0t6rYRofpWEU36mgXV7jIdZd6aHdHaTiFF0r4ZveZeEUHaohnZ4j4pXb5+QeXCNlFVsn5R1bpGVU22fk3hrjpRabJuXfWWOl1tqn5l5YpKWVm2jmnRjkpJVcKGcdWORj1Zwnp52Y5WMVHGdnHVmmYdUdpqXdWubglZ9l5F2cJt+VoSXjHRyn3lUipqIcXOid1CPmoZwdKN2S5SdgXJ0pXNIlqJ7c3Ond0GXpXxxcaWAPZOnfXRtooc+j6d9eG2dikGLp3t9a5uLRIaren9qmY5Fg6l/gGqSlkSApIV/bYmdRH2ih4NrhJ5LcqaGiWeBnVdlqYOQZXqgZFufkolwY7RmVZWZi3JhoY09k56PdVeklEF+sIGKV4OwQWy3i31ocLdPWLqLg3VYumZAuJt6elethSmynIOCT5uiJJmxfYVXgb0td7SIjF5ruFpGv4uRZmClkCmhoJF6XX+2O2m1j4lkY6+AKq+Zlm9gf8Asd7CUg2dhs3sstZiScmJ4vy56sJKCclmsgCyxnZVxZm7BN2qynYRsX5ySKJyon29pZbpUTqerjWljhqswdK2ud2hgpYM6i66fcWhvqGBPl7iMbWl7qEZinbeCcWCLoklzjK2DcWWPjWx3hJCCfXiAgICA", "狗": "gICBgXt4fYmGgHqDgn9qeoiRlXpveYBvenSVoo1wb3h4dHOImpd5fXJ4dXZ/kYqKfXGHenl7g4yJa32GhIF6gIl9dX1+h4KEfIF9eX2Af4uGeIJ4fYJ4hY19gXh7gHiAioeCfHZ/fH19jIp/eXt+fnaBkYJ/enyAenSLiYOAen99eXuHiIN9e3mDfHqHh4WBc32EeYCEhYp6c4N8f4GCiYR0eoR/fXuFi4F0e4aAenqFi39yfYWEfHmCioJ1eYOJfnd/jYRzdoWLfXSAj4Nxd4aLe3OEjIBzeYeKdnaHjXttgoqEdXmOhHZ3g4t7eIOLf3d9goN4gYiFfHiAgn18g4iDfHWAhoJ7eYaReWh9kYt0eYmFfHZ8gIyGen1/fXB4kpt4bYKEa3uOioCNhGpggoiikGt6eH5hgoCuv1QogMmQLneSxKU2TpfGYUFtoMynPEaKvWhUgIPFtEQzirl3TJSHl7FrMn24gUx9q3OqiklOs59KfJx8j7VJRo3MQ22mhHScmjlor5slsKlOgsRzJ4PjRj/bc1mYyj1ErLcoe89iYKTEIVXDmyehr15pzoUMlM9qHNShUmvYZySdw1Y17XZQhtdHNbSvQVXyWVWY1DVFt5pLbt5BarHDF1u/oDhp60pqncQlaZ+jRH7PPISqsQ6DsJEsmc84ebasC4iziCavwTl5vaEWfrWSHa69Rne4nSB8spAesr1EdbaoGnS5jx+2tkKCt5oXgbyAIMWqRoC4mBSEvH0nyppOhMCHFIrCcy3LlFl9wnYohL5wPMmAZYfAYTaGxV9IynplisNTPYfMTWDAb2iZwT9AmMg/fahqdK6pKFWrui6Ym2aAtZcca6+oNKCXZYS3iSRvqaU8o4h2hLGCL2+WskOlcIWcnmQ+gJ+YRa9yi5qVTV9zsXtYpXqZk4k9cWLEfHGAfKGkeD9nV8aLlGV7krR3SFxNwZGfZGifvIQ/WleTnqKGXoqji3VtXV95pJeAhoV8h5ZrZGd5fJSjgG17lImFg2ZVfoqMiIt6eYyRfWuAeXl4iXp2iZmDcIODhnV8e3h+fIKBg4iIin9ydIeDdHh+fnuNloFxgoB7dn6EdYWNgXmBh35+end8got7gIl/eniDhn5/fXyBfoOBgX12f4SFhIN7fIF+fX19g4R+fXyEgnyBgn1/gnp7g4Z+eICFfnx/fYCHh315f4V8en6BgX+BgICCgnx9fYGCfYCCfoKCfnl+hYB4gImCfH+Afn19fn2FhX18hYF7fYOAfIGCfn6CgH5/gICA", "叫": "gH9/gIB+f4KCfn6Ce32CgniBh4J5f4Z6fIGEeX6Dh4B+fHyFfnl7iYZ8eoWEeH2Agn1/g4R4hH99gH2FeYB8hoGBgH6Adn9/goOFgX53gYF9foSLeH15fX+JkHl3d395go+LfHV4eX+Bi4uJfWxqd4iVnpJuWll6lKKxmmQ6SXafuM2nSyQ4cJvO9KM4EzZrqOTnjzMhOn2z08eDRzFNhKq6soRURl6ClaipimZaYXOKnqaUdmFZboiVoZ1/YFlwgo2lo3piY217iKWhfmpiZX+OmaCHbV1nh4mHoJRxXWWCiomdlHNnYXuPjI+Qg3BWbpePiJCLc1Rrmo+FjY56WGGWmYSEiIheVZKkgnWLl2BGkbJ+bY+fXj6UuXlnkqVgOo+9e2KUpWU3i7+AXY+oazaEwoRZjKpwNnvGh1aJq3E9dMKRVIKudUFxuplZdbOBNW7CmFZ1s4cqbtKPRIq8cCiB0H1DnMVTLJ7EYlattUg6rbNTZryhQU+ynlNzuZlDV7SSUYKzkUxZsZFKh7iJTluwk0WFvYdNXLCYPIPEiEtdr5w5fcyFS2KqnT51y4pPYqOhR2zDklRdnaVRZruZWFqZplhis59cV5OlYWGrpGJTjadnXaaqZk+Fq25XpK5oUXyrd0yjt2hTdKeHRZnCaFNwo5RAis1xT22dnUV6031Ja5mgUWbRjkZqj6RdV8+dRGqBq2dOx6VQZnWrb063r19adaCAT6C7alR4j5BNj8luV3GKm1B6zntaaYKiXGXLkFdqdahsUb+nWG1ppYJErLlhamOamUCRxXNhZIqsRnXJiFllf7JYXcWaWGJ5rW1NuqtbXnWkfkepumNccpiNRpfEb1lwjZdJhcp6WXCFm1JzzIRacX2bXmTIkltxd5lsV7+gX3B0lXhPsq1jb3KPgk2ktWptcYqLTZO7c2xuhpFQgr99a22ElVF1wIhoboOXUWu+j2lwg5hVYbuVa3CCmVlauJlscIKaXVa0nWxygphhVa+gbXOAlmdVpqFxd3+SbFeeoXR3gI5xWJigdneCinRckaF4eIGHdmGKn3x4gYN4ZoWcf3iBgXhrhZmAd4GBeW6DlYN4gIB6c4GQhHl/gXx1f46Fe3yAfXd9i4Z+fH99en2Ih35+fn55fYaHgH5+fXt+g4WDgHx8fYCBhYOAfnx8foGEhH9/fHuAgIKDgYB7fH9+f4SBg3x9gH6AgIKAgH1/fH+DgYKBfn58fYOAgIGAfXx+hIJ/gX9+en6Bgn+Bg4B8fIODenqFgnl8i4l2fIl+cHyNgXWGkXpyhoh2coSKe3uLhXt6foJ8fYSDfnl8iYZ+goJ4bHiLjYWIhnZncIqOh4iLeGZri4+AiYx+Z26HiHuKlH9vcH95eJGejHRsaG55lqyffFtUZX+YvK56RkVog6THumozOm6Ks9W4Wx06c5q9261PEjt9psPSpkgUPoqsvMOhSxpJj6eoq5RhRWGKlpKSinRoc4OGg4KBgA=="};

let audioCtx;
const decoded = {};
const activeKeys = new Set();

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function decodeSample(label) {
  if (decoded[label]) return decoded[label];
  const ac = ctx();
  const raw = atob(SAMPLE_PCM[label]);
  const buffer = ac.createBuffer(1, raw.length, SAMPLE_RATE);
  const out = buffer.getChannelData(0);
  for (let i = 0; i < raw.length; i++) out[i] = (raw.charCodeAt(i) / 255 - 0.5) / 0.48;
  decoded[label] = buffer;
  return buffer;
}

async function ensureAudio() {
  const ac = ctx();
  if (ac.state === 'suspended') await ac.resume();
  loadState.textContent = 'SOUND · READY';
}

async function playLabel(label, repeat = false) {
  await ensureAudio();
  const ac = ctx();
  const src = ac.createBufferSource();
  const gain = ac.createGain();
  src.buffer = decodeSample(label);
  src.playbackRate.value = repeat ? 1.06 : 1;
  gain.gain.value = 0.82;
  src.connect(gain);
  gain.connect(ac.destination);
  src.start();
}

function visualHit(key, repeat = false) {
  const label = LABELS[key];
  stage.style.background = COLORS[label];
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
  const label = LABELS[key];
  if (!label) return;
  playLabel(label, repeat).catch(console.error);
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
      btn.addEventListener('pointerdown', e => { e.preventDefault(); keyDown(key, false); });
      const release = () => keyUp(key);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointercancel', release);
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
reset();
