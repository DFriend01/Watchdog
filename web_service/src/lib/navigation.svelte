<script>

</script>

<div class="shadow">

</div>
<div class="container">
    <span class="close-button">X</span>
    <h2 class="title">Navigation</h2>
    <ul class="list">
        <li>Element 1</li>
        <li>Element 2</li>
        <li>Element 3</li>
    </ul>
</div>

<style>
    .shadow {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background-color: black;
        opacity: 0.4;
        z-index: 5;
    }

    .container {
        position: relative;
        width: 300px;
        background-color: blue;
        border-radius: 10px;
        padding: 20px;
        z-index: 10;
    }

    .container-title {
        position: relative;

    }

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 18px;
        cursor: pointer;
    }

    .list {
        margin-top: 10px;
        padding-left: 20px;
    }
</style>