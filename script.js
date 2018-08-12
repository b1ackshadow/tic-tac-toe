$(document).ready(function() {
  var player1Score = 0;
  var player2Score = 0;
  var move = 1;
  var play = true;
  const winnableCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [1, 5, 9]
  ];
  var tiles = [];
  var player1 = true,
    player2 = false;
  $(`#player1Score`)
    .empty()
    .text(player1Score);
  $(`#player2Score`)
    .empty()
    .text(player2Score);
  const clearBoard = () => {
    for (let i = 1; i <= 9; i++) {
      $(`#${i}`).text("");
      $(`#board tr td#${i}`).css("background", "white");
    }
    tiles = [];
    player1 = false;
    player2 = true;
  };

  const turnChange = () => {
    player1 = !player1;
    player2 = !player2;
  };
  $("td").click(function() {
    $(`#winner-message`).empty();
    if (player1 && $(this).text() === "") {
      $(this).append("X");
      let index = $(this).attr("id") - 1;
      $(`#board tr td#${index + 1}`).css("background", "#e4e4e4");

      tiles[index] = { tileValue: "X" };
      checkWin();
      player1 = !player1;
      player2 = !player2;
    } else if (player2 && $(this).text() === "") {
      $(this).append("O");
      let index = $(this).attr("id") - 1;
      tiles[index] = { tileValue: "O" };
      $(`#board tr td#${index + 1}`).css("background", "#e4e4e4");

      checkWin();
      player1 = !player1;
      player2 = !player2;
    } else {
      alert("No cheating");
    }
  });
  const checkWin = () => {
    console.log(tiles);
    for (let i = 0; i < 8; i++) {
      var values = [];
      for (let j = 0; j < 3; j++) {
        values[j] = winnableCombination[i][j] - 1;
        // alert(values);
      }
      //   alert(values);
      const valueOf = tiles => {
        for (key in tiles) {
          // console.log(tiles[values[0]][key]);
          if (key === "tileValue") return tiles[key];
        }
      };
      if (tiles[values[0]] && tiles[values[1]] && tiles[values[2]]) {
        console.log(`
        ${values[0]} - ${valueOf(tiles[values[0]])} \n
        ${values[1]} - ${valueOf(tiles[values[1]])} \n
        ${values[2]} - ${valueOf(tiles[values[2]])}
        `);
        if (
          valueOf(tiles[values[0]]) == valueOf(tiles[values[1]]) &&
          valueOf(tiles[values[1]]) == valueOf(tiles[values[2]])
        ) {
          alert(tiles[values[1]].tileValue + " Won");
          tiles[values[1]].tileValue === "X" ? player1Score++ : player2Score++;
          $(`#player1Score`)
            .empty()
            .text(player1Score);
          $(`#player2Score`)
            .empty()
            .text(player2Score);
          //   alert(tiles[values[1]].tileValue + " WOn");
          clearBoard();
        }
      }
    }
  };

  //   checkWin();
});
