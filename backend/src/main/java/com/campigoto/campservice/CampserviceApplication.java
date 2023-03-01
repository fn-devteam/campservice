package com.campigoto.campservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.Set;
import lombok.Data;
import lombok.SneakyThrows;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.CrudRepository;

@SpringBootApplication
public class CampserviceApplication {

    public static void main(String[] args) throws NoSuchFieldException, JsonProcessingException {
        // SpringApplication.run(CampserviceApplication.class, args);

        var app = new CampserviceApplication();
        var produto = app.findById(1l);

        var mapper = new ObjectMapper();
//        var json = mapper.writeValueAsString(produto);
//        System.out.println("======== Without DTO ==========");
//        System.out.println(json);

        System.out.println("======== With DTO ==========");
        var dto = app.toDto(produto);
        var json = mapper.writeValueAsString(dto);
        System.out.println(json);
    }

    interface ProdutoRepository { // extends JpaRepository<Produto, Long>
        Produto findById(Long id);
    }

    // class ProdutoService {
    private ProdutoRepository repository = new ProductRepositoryProxy<Produto, Long>();

    private Produto findById(Long id){
        return repository.findById(id);
    }
    // }

    @Data
    @Entity
    class Produto {
        private Long id;

        @ManyToOne(fetch = FetchType.EAGER)
        private Fornecedor fornecedor;

        @OneToMany(fetch = FetchType.EAGER)
        private Set<CodigoBarra> codebars;
    }

    @Data
    @Entity
    class Fornecedor {
        private Long id;
        private String nome;
        private String colunaComDadoSensivel;
    }

    @Data
    @Entity
    class CodigoBarra {
        private Long id;
        private Long codigo;
    }


    // ******* SPRING IMPLEMENTATION ********** //
    class ProductRepositoryProxy<T, ID> implements ProdutoRepository{

        public Produto findById(Long id) {
            // Realiza a busca no banco ResultSet e os caraio
            var product = new ProdutoProxy();
            product.setId(id);

            if (product.fieldIsEager("fornecedor")) {
                var fornecedor = fingeUmaBuscaDeFornecedorNoBanco();
                product.setFornecedor(fornecedor);
            } else {
                product.setFornecedor(new FornecedorProxy());
            }

            if (product.fieldIsEager("codebars")) {
                var codebars = fingeUmaBuscaDeCodigoDeBarras();
                product.setCodebars(codebars);
            } else {
                product.setCodebars(Set.of(new CodigoBarraProxy()));
            }

            return product;
        }
    }

    @Data
    class FornecedorProxy extends Fornecedor {
        private boolean proxyInitialized = false;
    }

    @Data
    class CodigoBarraProxy extends CodigoBarra {
        private boolean proxyInitialized = false;
    }

    @Data
    class ProdutoProxy extends Produto {

        // a lá @Transactional
        private Boolean isInTransaction = false;

        @Override
        public Fornecedor getFornecedor() {
            var proxy = (FornecedorProxy) super.getFornecedor();
            if (proxy.isProxyInitialized()) {
                return proxy;
            }

            if (isInTransaction) {
                setFornecedor(fingeUmaBuscaDeFornecedorNoBanco());
                return super.getFornecedor();
            }

            throw new RuntimeException("Object not initialized");
        }

        @Override
        public Set<CodigoBarra> getCodebars() {

            var proxy = (CodigoBarraProxy) super.getCodebars().stream().findFirst().orElse(new CodigoBarraProxy());

            if (proxy.isProxyInitialized()) {
                return super.getCodebars();
            }

            if (isInTransaction) {
                // faz a consulta no banco
                proxy.setId(1L);
                proxy.setCodigo(1231231L);
                proxy.setProxyInitialized(true);

                setCodebars(Set.of(proxy));

                return super.getCodebars();
            }

            throw new RuntimeException("Object not initialized");
        }

        @SneakyThrows
        public boolean fieldIsEager(String fieldName) {
            var field = Produto.class.getDeclaredField(fieldName);
            var annotation = Arrays.stream(field.getAnnotations()).findFirst().get();
            Class<? extends Annotation> aClass = annotation.annotationType();

            if (aClass.equals(OneToMany.class)) {
                return ((OneToMany) annotation).fetch() == FetchType.EAGER;
            } else if (aClass.equals(ManyToOne.class)) {
                return ((ManyToOne) annotation).fetch() == FetchType.EAGER;
            } else {
                return false;
            }
        }
    }

    @SneakyThrows
    private Fornecedor fingeUmaBuscaDeFornecedorNoBanco() {
        return new FornecedorProxy() {{
            setId(1L);
            setNome("Nome do fornecedor");
            setColunaComDadoSensivel("Um dado sensível que não deveria ser exposto");

            // Um controle de Proxy por causa do FetchType
            setProxyInitialized(true);
        }};
    }

    @SneakyThrows
    private Set<CodigoBarra> fingeUmaBuscaDeCodigoDeBarras() {
        var codigo = new CodigoBarraProxy();
        codigo.setId(1L);
        codigo.setCodigo(1231231L);

        // Um controle de Proxy por causa do FetchType
        codigo.setProxyInitialized(true);
        return Set.of(codigo);
    }

    // ******** USANDO DTO **********
    @Data
    class ProdutoDto {
        private Long id;
        private FornecedorDto fornecedor;
    }

    @Data
    class FornecedorDto {
        private Long id;
        private String nome;
    }

    @Data
    class CodigoBarraDto {
        private Long codigo;
    }

    private ProdutoDto toDto(Produto produto) {
        var dto = new ProdutoDto();
        dto.setId(produto.getId());

        var fornecedorDto = toDto(produto.getFornecedor());
        dto.setFornecedor(fornecedorDto);
        return dto;
    }

    private FornecedorDto toDto(Fornecedor fornecedor) {
        var dto = new FornecedorDto();
        dto.setId(fornecedor.getId());
        dto.setNome(fornecedor.getNome());
        return dto;
    }
}
