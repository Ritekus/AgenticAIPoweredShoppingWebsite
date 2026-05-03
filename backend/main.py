from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.base import BaseHTTPMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Aura Luxury Fashion")

class ForceHTTPSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request.scope["scheme"] = "https"
        return await call_next(request)

app.add_middleware(ForceHTTPSMiddleware)

# Mount static files
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Setup Jinja2 templates
templates = Jinja2Templates(directory="frontend/templates")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    logger.info("Serving home page")
    try:
        return templates.TemplateResponse(request, "home.html", {"page": "home"})
    except Exception as e:
        logger.error(f"Error rendering home page: {e}", exc_info=True)
        raise

@app.get("/shop", response_class=HTMLResponse)
async def shop(request: Request):
    logger.info("Serving shop page")
    try:
        return templates.TemplateResponse(request, "shop.html", {"page": "shop"})
    except Exception as e:
        logger.error(f"Error rendering shop page: {e}", exc_info=True)
        raise

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    logger.info("Serving about page")
    try:
        return templates.TemplateResponse(request, "about.html", {"page": "about"})
    except Exception as e:
        logger.error(f"Error rendering about page: {e}", exc_info=True)
        raise

@app.get("/contact", response_class=HTMLResponse)
async def contact(request: Request):
    logger.info("Serving contact page")
    try:
        return templates.TemplateResponse(request, "contact.html", {"page": "contact"})
    except Exception as e:
        logger.error(f"Error rendering contact page: {e}", exc_info=True)
        raise
