<?php
include_once ("helpers/url.php");
include_once ("templates/header.php");
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Estilos do projetos!-->
    <link rel="stylesheet" href="<?=$BASE_URL?>./stylesheets/stylesheet.css">
</head>

<body>
<main>
    <div id="title-container">
      <h1>Blog do Lokistrange</h1>
      <p>O seu blog de Programação</p>
    </div>
    <div id="posts-container">
      <?php foreach($posts as $post): ?>
        <div class="post-box">
          <img src="<?= $BASE_URL ?>/img/<?= $post['img'] ?>" alt="<?= $post['title'] ?>">
          <h2 class="post-title"><a href="<?= $BASE_URL ?>post.php?id=<?= $post['id'] ?>"><?= $post['title'] ?></a></h2>
          <p class="post-description"><?= $post['description'] ?></p>
          
          <div class="tags-container">
            <?php foreach($post['tags'] as $tag): ?>
            <a href="#"><?= $tag ?></a>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </main>
<!-- Inclusão do rodapé -->
<?php
  include_once("templates/footer.php");
?>
</body>
</html>