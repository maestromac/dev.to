export function getOnboardingTags() {
  return fetch('/api/tags/onboarding')
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function getUsersToFollow() {
  return fetch('/api/users?state=follow_suggestions', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function sendBulkFollowRequest(formData) {
  return fetch('/api/follows', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': window.onboardingCsrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  });
}

export function sendOnboardingUpdate(formData) {
  return fetch('/onboarding_update', {
    method: 'PATCH',
    headers: {
      'X-CSRF-Token': window.onboardingCsrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function sendFollowUpdate(formData) {
  return fetch('/follows', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': window.onboardingCsrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}
