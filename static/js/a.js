//排对阵
n = 8;


flag = []

playorder = []

playordername = []

for (i = 0; i < n; i++) {
    flag[i] = 0
}

for (i = 0; i < n; i++) {
    number = Math.floor(Math.random() * n)
    while (flag[number] == 1) {
        number = Math.floor(Math.random() * n)
    }
    console.log(number)
    flag[number] = 1
    playorder[i] = number
}

console.log(playorder)


playname = ['kid', 'N', 'rami3e', 'lunan', '露露', 'xr', '厕所', '墨瞳']
seed = 0
noseed = 4

for (i = 0; i < n; i++) {
    if (playorder[i] < 4) {
        playordername[seed] = playname[playorder[i]]
        seed = seed + 1
    } else {
        playordername[noseed] = playname[playorder[i]]
        noseed = noseed + 1
    }
}

console.log(playordername)

/*
a = []
flag = []

n = 12

for (i = 0; i < 12; i++) {
    a[i] = 0;
}

for (i = 0; i < 3; i++) {
    for (k = 0; k < n; k++) {
        flag[k] = 0;
    }
    for (j = 0; j < 4; j++) {
        number = Math.floor(Math.random() * n)
        while (flag[number] == 1) {
            number = Math.floor(Math.random() * n)
        }
        switch (j) {
            case 0:
                a[number] += 7;
                break;
            case 1:
                a[number] += 5;
                break;
            case 2:
                a[number] += 2;
                break;
            case 3:
                a[number] += 2;
                break;
        }
    }
}

console.log(a)
*/