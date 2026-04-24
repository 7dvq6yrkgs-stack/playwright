"""
auth/oauth.py — Gmail OAuth2 PKCE flow with persistent token cache.

The token is stored in auth/token.json after the first successful login.
Subsequent calls silently refresh the access token — no browser prompt needed.
This provides "always-on" permission for MCP tools.
"""
from pathlib import Path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

# ---------------------------------------------------------------------------
# Scopes — grant once, persist forever via token.json
# ---------------------------------------------------------------------------
SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",   # read mail
    "https://www.googleapis.com/auth/gmail.send",       # send mail
    "https://www.googleapis.com/auth/gmail.modify",     # archive / label / trash
    "https://www.googleapis.com/auth/gmail.compose",    # drafts
]

_BASE = Path(__file__).parent
CREDENTIALS_FILE = _BASE / "credentials.json"
TOKEN_FILE = _BASE / "token.json"


def get_credentials() -> Credentials:
    """
    Return valid OAuth2 credentials, refreshing or re-prompting as needed.

    Flow:
      1. Load token.json if it exists.
      2. If valid → return immediately.
      3. If expired but refresh_token present → refresh silently.
      4. Otherwise → open browser for first-time authorization and persist token.
    """
    creds: Credentials | None = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                raise FileNotFoundError(
                    f"Missing {CREDENTIALS_FILE}. Download your OAuth 2.0 Client ID "
                    "(Desktop app) from Google Cloud Console and place it there."
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDENTIALS_FILE), SCOPES
            )
            creds = flow.run_local_server(port=0)

        # Persist for next run
        TOKEN_FILE.write_text(creds.to_json())

    return creds
