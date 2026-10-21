// /portal.html → área de cliente de DuctFlow, CONSERVANDO el #token=… del enlace del email.
// El meta refresh de portal.html pierde el fragmento (#…); este script, que se ejecuta antes,
// lo pasa entero. Sin JS, el meta refresh sigue funcionando (pero sin el token).
(function () {
  var url = 'https://ductflow.app/portal.html?o=aerisfactory';
  if (location.hash) location.replace(url + location.hash);
})();
