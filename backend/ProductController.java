```java
package com.zestify.controller;

import com.zestify.model.Product;
import com.zestify.service.ProductService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;


    public ProductController(
            ProductService productService) {

        this.productService =
                productService;
    }


    // GET ALL PRODUCTS

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();

    }


    // GET PRODUCT BY ID

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {


        Product product =
                productService.getProductById(id);


        if (product == null) {

            return ResponseEntity
                    .notFound()
                    .build();

        }


        return ResponseEntity.ok(product);
    }


    // ADD PRODUCT

    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestBody Product product) {


        Product savedProduct =
                productService.addProduct(product);


        return ResponseEntity
                .status(201)
                .body(savedProduct);
    }


    // UPDATE PRODUCT

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {


        Product updatedProduct =
                productService.updateProduct(
                        id,
                        product
                );


        if (updatedProduct == null) {

            return ResponseEntity
                    .notFound()
                    .build();

        }


        return ResponseEntity.ok(
                updatedProduct
        );
    }


    // DELETE PRODUCT

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {


        boolean deleted =
                productService.deleteProduct(id);


        if (!deleted) {

            return ResponseEntity
                    .notFound()
                    .build();

        }


        return ResponseEntity
                .noContent()
                .build();
    }
}
```
