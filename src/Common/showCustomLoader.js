export const showCustomLoader = (action) => {
    const existingLoader = document.getElementById('custom-loader');
  
    // If action is false and loader exists → remove it
    if (!action && existingLoader) {
      document.body.removeChild(existingLoader);
      return;
    }
  
    // If loader already exists and action is true → do nothing
    if (existingLoader || !action) return;
  
    const loaderWrapper = document.createElement('div');
    loaderWrapper.id = 'custom-loader';
    loaderWrapper.style.position = 'fixed';
    loaderWrapper.style.top = '0';
    loaderWrapper.style.left = '0';
    loaderWrapper.style.width = '100vw';
    loaderWrapper.style.height = '100vh';
    loaderWrapper.style.backdropFilter = 'blur(4px)';
    loaderWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    loaderWrapper.style.zIndex = '1050';
    loaderWrapper.style.display = 'flex';
    loaderWrapper.style.justifyContent = 'center';
    loaderWrapper.style.alignItems = 'center';
  
    loaderWrapper.innerHTML = `
      <button class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </button>
    `;
  
    document.body.appendChild(loaderWrapper);
  };
  