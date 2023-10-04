# Use a smaller and more efficient base image for serving the app
FROM nginx:alpine

# Remove the default NGINX website
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY .nginx.conf /etc/nginx/nginx.conf
# Copy the contents of the 'dist' directory into the NGINX image's default HTML directory
COPY ./dist/contractClient   /usr/share/nginx/html

# Expose the port that NGINX listens to (usually port 80)
EXPOSE 7000

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
