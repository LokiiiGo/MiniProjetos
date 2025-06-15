<?php
include_once("helpers/url.php");
include_once("data/posts.php");
include_once("data/categories.php");

if(isset($_GET['id'])) {
        $postID = $_GET['id'];
        $currentPost;

        foreach($posts as $post) {
            if($post['id'] == $postID) {
                $currentPost = $post;
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="PT-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?=$BASE_URL?>./stylesheets/stylesheets.css">
  <link rel="icon" href="./img/blogger.png" type="image-x icon">
  <title>Post</title>
</head>
<body>
<main id="post-container">
  <div class="content-container">
    <h1 id="main-title"><?= $currentPost['title'] ?></h1>
    <p id="post-description"><?= $currentPost['description'] ?></p>
    <div class="img-container">
      <img src="<?= $BASE_URL ?>/img/<?= $currentPost['img'] ?>" alt="<?= $currentPost['title'] ?>">
    </div>    
    <h2>O que é Bootstrap?</h2>
    <p class="post-content">O Bootstrap é um framework front-end gratuito que facilita a criação de sites responsivos e com bom design. Ele inclui HTML, CSS e JavaScript prontos para usar, como botões, formulários, navegação, grid layout, entre outros.</p>
    <?php
    echo "<br>";
    ?>
    <h2>O que é Mobile First?</h2>
    <p class="post-content">Mobile-first significa que o layout do site é planejado primeiro para telas pequenas (celulares) e depois ajustado para telas maiores (tablets e computadores). O Bootstrap facilita isso com seu sistema de grid responsivo.</p>
    <?php
    echo "<br>";
    ?>
    <h2>Dicas para iniciantes</h2>
    <ul id="tag-lista">
      <li>Comece com o básico: HTML, CSS e JavaScript.</li>
      <li>Use a classe container para organizar o conteúdo principal da página.</li>
      <li>As classes de grid (row, col) ajudam a dividir a página em colunas.</li>
      <li>Você pode personalizar estilos com suas próprias regras CSS.</li>
      <li>Use o Bootstrap para aprender sobre grids e responsividade.</li>
      <li>Pratique criando pequenos projetos.</li>
      <li>Leia a documentação do Bootstrap para entender como usar os componentes.</li>
      <li>Participe de comunidades online para tirar dúvidas e aprender com outros desenvolvedores.</li>
  </ul>
  </div>
  <div class="nav-container">
    <h3 id="tags-title">Tags</h3>
    <ul id="tag-list">
      <?php foreach($currentPost['tags'] as $tag): ?>
        <li><a href="#"><?= $tag ?></a></li>
      <?php endforeach; ?>
    </ul>
    <h3 id="categories-title">Categorias</h3>
    <ul id="categories-list">
      <?php foreach($categories as $category): ?>
        <li><a href="#"><?= $category ?></a></li>
      <?php endforeach; ?>
    </ul>
  </div>
</main>

<!-- Inclusão do rodapé -->
<?php
  include_once("templates/footer.php");
?>
</body>
</html>