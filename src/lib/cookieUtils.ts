export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  const accessToken = cookies.find(cookie => cookie.trim().startsWith(`${name}=`))

  if (!accessToken) return null;
  return accessToken.trim().split('=')[1];
}

export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = 'expires=' + d.toUTCString() + '; ';
  }
  document.cookie = name + '=' + value + '; ' + expires + 'path=/';
}

export function deleteCookie(name: string) {
  setCookie(name, '', -1);

  
}